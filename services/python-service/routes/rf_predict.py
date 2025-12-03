from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from rdkit import Chem
from rdkit.Chem import AllChem
import numpy as np
import joblib


router = APIRouter()


MODEL_PATH = Path(__file__).resolve().parent.parent / "models/best_random_forest_model.joblib"


class RFPredictRequest(BaseModel):
    smiles: str


class RFPredictResponse(BaseModel):
    smiles: str
    prediction: int


def _load_model():
    if not MODEL_PATH.exists():
        raise HTTPException(status_code=500, detail="Random Forest model file not found")
    try:
        model = joblib.load(MODEL_PATH)
    except Exception as exc:  # pragma: no cover - I/O errors
        raise HTTPException(status_code=500, detail=f"Failed to load model: {exc}")
    return model


def _smiles_to_fingerprint(smiles: str, radius: int = 2, n_bits: int = 2048) -> np.ndarray:
    mol = Chem.MolFromSmiles(smiles)
    if mol is None:
        raise HTTPException(status_code=400, detail="Invalid SMILES string")
    fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=n_bits)
    arr = np.array(fp).reshape(1, -1)
    return arr


@router.post("/rf-predict", response_model=RFPredictResponse)
def rf_predict(payload: RFPredictRequest) -> RFPredictResponse:
    print(f"Received RF predict request for SMILES: {payload.smiles}", MODEL_PATH)
    model = _load_model()
    features = _smiles_to_fingerprint(payload.smiles)
    try:
        pred = model.predict(features)
    except Exception as exc:  # pragma: no cover - model specific
        raise HTTPException(status_code=500, detail=f"Model prediction failed: {exc}")

    prediction_int = int(pred[0])
    return RFPredictResponse(smiles=payload.smiles, prediction=prediction_int)
