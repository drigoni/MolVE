from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional


app = FastAPI(title="Molecular Python Service")


class MoleculeRequest(BaseModel):
    smiles: str


class PropertiesResponse(BaseModel):
    smiles: str
    properties: dict


class MLRequest(BaseModel):
    model_name: str
    features: List[float]


class MLResponse(BaseModel):
    model_name: str
    output: List[float]


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.post("/properties", response_model=PropertiesResponse)
def calculate_properties(payload: MoleculeRequest) -> PropertiesResponse:
    # TODO: Implement real RDKit properties using payload.smiles
    return PropertiesResponse(smiles=payload.smiles, properties={})


@app.post("/ml", response_model=MLResponse)
def run_ml_model(payload: MLRequest) -> MLResponse:
    # TODO: Implement real scikit-learn / PyTorch inference
    return MLResponse(model_name=payload.model_name, output=payload.features)
