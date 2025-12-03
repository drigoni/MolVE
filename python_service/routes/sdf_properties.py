from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from rdkit import Chem
from rdkit.Chem import Descriptors
from rdkit.Contrib.SA_Score import sascorer
from rdkit.Contrib.NP_Score import npscorer


router = APIRouter()


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


@router.post("/sdf-properties", response_model=SdfPropertiesResponse)
def sdf_properties(payload: SdfPropertiesRequest) -> SdfPropertiesResponse:
    if not payload.sdf or not payload.sdf.strip():
        raise HTTPException(status_code=400, detail="SDF content is required")

    suppl = Chem.SDMolSupplier()
    suppl.SetData(payload.sdf, removeHs=False)
    if len(suppl) == 0:
        raise HTTPException(status_code=400, detail="Could not parse SDF block")

    mol = suppl[0]
    if mol is None:
        raise HTTPException(status_code=400, detail="Invalid SDF molecule")

    mw = float(Descriptors.MolWt(mol))
    logp = float(Descriptors.MolLogP(mol))
    hbd = int(Descriptors.NumHDonors(mol))
    hba = int(Descriptors.NumHAcceptors(mol))

    fscore = npscorer.readNPModel()
    npscores = npscorer.scoreMolWConfidence(mol, fscore)
    nps = float(npscores[0])
    nps_confidence = float(npscores[1])
    sas = float(sascorer.calculateScore(mol))

    return SdfPropertiesResponse(
        molecularWeight=mw,
        logP=logp,
        hbd=hbd,
        hba=hba,
        sas=sas,
        nps=nps,
        npsConfidence=nps_confidence,
    )
