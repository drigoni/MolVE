from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from rdkit import Chem
from rdkit.Chem import AllChem


router = APIRouter()


class SdfRequest(BaseModel):
    smiles: str


class SdfResponse(BaseModel):
    smiles: str
    sdf: str


@router.post("/smiles-to-sdf", response_model=SdfResponse)
def generate_sdf(payload: SdfRequest) -> SdfResponse:
    """Generate 3D SDF for a SMILES string using RDKit."""

    mol = Chem.MolFromSmiles(payload.smiles)
    if not mol:
        raise HTTPException(status_code=400, detail="Invalid SMILES string")

    mol = Chem.AddHs(mol)

    params = AllChem.ETKDGv3()
    params.randomSeed = 0xF00D
    try:
        result = AllChem.EmbedMolecule(mol, params)
        if result != 0:
            raise ValueError("Embedding failed")
    except Exception as e:  # pragma: no cover - RDKit internal errors
        raise HTTPException(status_code=500, detail=f"RDKit failed to embed molecule: {str(e)}")

    try:
        AllChem.UFFOptimizeMolecule(mol)
    except Exception:
        # Geometry optimization failure is non-fatal for SDF generation
        pass

    sdf_block = Chem.MolToMolBlock(mol)
    if not sdf_block:
        raise HTTPException(status_code=500, detail="Failed to generate SDF")

    return SdfResponse(smiles=payload.smiles, sdf=sdf_block)
