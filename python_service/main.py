from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any

from rdkit import Chem
from rdkit.Chem import AllChem, Descriptors, Crippen, Lipinski

from rdkit.Contrib.SA_Score import sascorer
from rdkit.Contrib.NP_Score import npscorer



app = FastAPI(title="Molecular Python Service")


class MoleculeRequest(BaseModel):
    smiles: str


class PropertiesResponse(BaseModel):
    smiles: str
    properties: dict


class SdfRequest(BaseModel):
    smiles: str


class SdfResponse(BaseModel):
    smiles: str
    sdf: str


class MLRequest(BaseModel):
    model_name: str
    features: List[float]


class MLResponse(BaseModel):
    model_name: str
    output: List[float]


class SdfPropertiesRequest(BaseModel):
    sdf: str


class SdfPropertiesResponse(BaseModel):
    molecularWeight: float
    logP: float
    hbd: int
    hba: int
    sas: float
    nps: float
    npsConfidence: float


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/smiles-to-sdf", response_model=SdfResponse)
def generate_sdf(payload: SdfRequest) -> SdfResponse:
    """Generate 3D SDF for a SMILES string using RDKit.

    - parses SMILES
    - adds hydrogens
    - embeds a 3D conformer
    - optimizes geometry with UFF
    - returns a single-molecule SDF block as text
    """

    # Parse the SMILES string
    mol = Chem.MolFromSmiles(payload.smiles)
    print("Molecule parsed from SMILES:", mol)
    if not mol:
        raise HTTPException(status_code=400, detail="Invalid SMILES string")

    # Add hydrogens
    mol = Chem.AddHs(mol)

    # Set up embedding parameters and embed the molecule
    params = AllChem.ETKDGv3()
    params.randomSeed = 0xf00d  # Use a consistent seed for reproducibility
    try:
        result = AllChem.EmbedMolecule(mol, params)
        if result != 0:
            raise ValueError("Embedding failed")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"RDKit failed to embed molecule: {str(e)}")

    # Optimize the geometry with UFF
    try:
        optimization_result = AllChem.UFFOptimizeMolecule(mol)
        if optimization_result != 0:
            # Log a warning if optimization did not fully converge
            print("Warning: UFF optimization did not converge")
    except Exception as e:
        # Log a warning if optimization fails
        print(f"Warning: UFF optimization failed with error: {str(e)}")

    # Generate SDF block
    sdf_block = Chem.MolToMolBlock(mol)
    if not sdf_block:
        raise HTTPException(status_code=500, detail="Failed to generate SDF")

    # Return the SDF response
    return SdfResponse(smiles=payload.smiles, sdf=sdf_block)


@app.post("/sdf-properties", response_model=SdfPropertiesResponse)
def sdf_properties(payload: SdfPropertiesRequest) -> SdfPropertiesResponse:
    """Compute basic properties starting from an SDF block.

    Expects a single-molecule SDF block as text, converts it to an RDKit
    molecule, and returns:

    - Molecular Weight
    - LogP
    - H-bond Donors
    - H-bond Acceptors
    - Synthetic Accessibility Score
    """

    if not payload.sdf or not payload.sdf.strip():
        raise HTTPException(status_code=400, detail="SDF content is required")

    # Create an in-memory SDMolSupplier from the SDF text
    suppl = Chem.SDMolSupplier()
    suppl.SetData(payload.sdf, removeHs=False)
    if len(suppl) == 0:
        raise HTTPException(status_code=400, detail="Could not parse SDF block")

    mol = suppl[0]
    if mol is None:
        raise HTTPException(status_code=400, detail="Invalid SDF molecule")

    # Compute properties
    mw = float(Descriptors.MolWt(mol))
    # logp = float(Crippen.MolLogP(mol))
    # hbd = int(Lipinski.NumHDonors(mol))
    # hba = int(Lipinski.NumHAcceptors(mol))
    logp = float(Descriptors.MolLogP(mol))
    hbd = int(Descriptors.NumHDonors(mol))
    hba = int(Descriptors.NumHAcceptors(mol))
    fscore = npscorer.readNPModel()
    npscores = npscorer.scoreMolWConfidence(mol,fscore)
    nps = float(npscores[0])
    npsConfidence = float(npscores[1])
    sas = float(sascorer.calculateScore(mol))

    return SdfPropertiesResponse(
        molecularWeight=mw,
        logP=logp,
        hbd=hbd,
        hba=hba,
        sas=sas,
        nps=nps,
        npsConfidence=npsConfidence
    )
