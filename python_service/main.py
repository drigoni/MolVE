from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

from rdkit import Chem
from rdkit.Chem import AllChem


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


@app.post("/ml", response_model=MLResponse)
def run_ml_model(payload: MLRequest) -> MLResponse:
    # TODO: Implement real scikit-learn / PyTorch inference
    return MLResponse(model_name=payload.model_name, output=payload.features)
