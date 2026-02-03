from fastapi import APIRouter

from .rf_predict import RFPredictRequest, RFPredictResponse, rf_predict


router = APIRouter(prefix="", tags=["predict"])


@router.post("/predict", response_model=RFPredictResponse)
def predict(payload: RFPredictRequest) -> RFPredictResponse:
    """Thin wrapper exposing rf_predict under /predict.

    This keeps the JSON body shape identical: {"smiles": "..."}.
    """
    return rf_predict(payload)
