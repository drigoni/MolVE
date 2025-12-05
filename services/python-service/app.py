from fastapi import FastAPI

from routes.health import router as health_router
from routes.smiles_to_sdf import router as smiles_to_sdf_router
from routes.sdf_properties import router as sdf_properties_router
from routes.rf_predict import router as rf_predict_router
from routes.predict import router as predict_router


def create_app() -> FastAPI:
    app = FastAPI(title="Molecular Python Service")

    app.include_router(health_router)
    app.include_router(smiles_to_sdf_router)
    app.include_router(sdf_properties_router)
    app.include_router(rf_predict_router)
    app.include_router(predict_router)

    return app


app = create_app()
