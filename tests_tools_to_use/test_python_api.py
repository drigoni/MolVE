import os
import pathlib
import requests

#export API_TOKEN=MTAtMTc2NDYwNTE2NTg0OC05YXkxaW1oaGtmaQ
#export BASE_URL=http://localhost:5000

#BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")
#API_TOKEN = os.getenv("API_TOKEN", "")

API_TOKEN="MTAtMTc2NDc4NDkzMjk2My1pZjlrbzFqbW83bA"    # admin
# API_TOKEN = "MTEtMTc2NDY4OTk3NTIyNi15Y2xkcWY4aXl1ag"    # user
BASE_URL="http://localhost:5000"

if not API_TOKEN:
    raise SystemExit("Set API_TOKEN env var API_TOKEN to one of your tokens")

headers = {"Authorization": f"Bearer {API_TOKEN}"}


def pretty_print(title: str, content):
    print("\n" + "=" * 80)
    print(title)
    print("-" * 80)
    print(content)


def create_single_molecule():
    """Test: POST /api/v1/molecules (admin token required)."""

    example_sdf = """RDKit          3D

 21 21  0  0  0  0  0  0  0  0999 V2000
   -2.9758   -2.2238   -0.0206 C   0  0  0  0  0  0  0  0  0  0  0  0
   -2.0921   -1.1148   -0.4802 C   0  0  0  0  0  0  0  0  0  0  0  0
   -2.3793   -0.4895   -1.5367 O   0  0  0  0  0  0  0  0  0  0  0  0
   -0.8996   -0.8595    0.2093 O   0  0  0  0  0  0  0  0  0  0  0  0
   -0.0955    0.2807    0.0477 C   0  0  0  0  0  0  0  0  0  0  0  0
   -0.6678    1.5282   -0.2707 C   0  0  0  0  0  0  0  0  0  0  0  0
    0.1334    2.6608   -0.4165 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.5116    2.5688   -0.2368 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.0941    1.3456    0.0982 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.3046    0.1895    0.2509 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.9664   -1.0921    0.6095 C   0  0  0  0  0  0  0  0  0  0  0  0
    1.3000   -2.1549    0.7323 O   0  0  0  0  0  0  0  0  0  0  0  0
    3.3435   -1.1331    0.8147 O   0  0  0  0  0  0  0  0  0  0  0  0
   -4.0374   -1.9828   -0.2398 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.8602   -2.3699    1.0738 H   0  0  0  0  0  0  0  0  0  0  0  0
   -2.6961   -3.1610   -0.5451 H   0  0  0  0  0  0  0  0  0  0  0  0
   -1.7385    1.6357   -0.3777 H   0  0  0  0  0  0  0  0  0  0  0  0
   -0.3171    3.6143   -0.6605 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.1306    3.4497   -0.3492 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.1670    1.3076    0.2384 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.8082   -1.9995    1.0591 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  2  1  0
  2  3  2  0
  2  4  1  0
  4  5  1  0
  5  6  2  0
  6  7  1  0
  7  8  2  0
  8  9  1  0
  9 10  2  0
 10 11  1  0
 11 12  2  0
 11 13  1  0
 10  5  1  0
  1 14  1  0
  1 15  1  0
  1 16  1  0
  6 17  1  0
  7 18  1  0
  8 19  1  0
  9 20  1  0
 13 21  1  0
M  END
>  <MolecularWeight>  (2) 
180.15900000000005

>  <SMILES>  (2) 
CC(=O)OC1=CC=CC=C1C(=O)O

>  <LogP>  (2) 
1.3101

>  <HBD>  (2) 
1

>  <HBA>  (2) 
4

>  <SAS>  (2) 
10

$$$$"""
    
    payload = {
        "smiles": "CCOC",
        "molecularWeight": "46.07",
        "logP": "-0.3",
        "hbd": 1,
        "hba": 1,
        "sas": "2.5",
        "sdf": example_sdf,
    }
    resp = requests.post(f"{BASE_URL}/api/v1/molecules", json=payload, headers=headers)
    resp.raise_for_status()
    pretty_print("Created / found molecule", resp.json())


def upload_sdf_admin():
    """Test: POST /api/v1/molecules/upload-sdf (admin token required)."""
    # Expect a small test SDF file next to this script, or skip.
    this_dir = pathlib.Path(__file__).resolve().parent
    sdf_path = this_dir / "test_molecules.sdf"
    if not sdf_path.exists():
        pretty_print("Upload SDF", f"No {sdf_path} file found, skipping upload test.")
        return

    with sdf_path.open("rb") as f:
        files = {"sdf": (sdf_path.name, f, "chemical/x-mdl-sdfile")}
        resp = requests.post(
            f"{BASE_URL}/api/v1/molecules/upload-sdf",
            headers=headers,
            files=files,
        )
    resp.raise_for_status()
    pretty_print("Upload SDF result", resp.json())


def download_molecules_sdf():
    """Test: GET /api/v1/molecules/download-sdf (any API token)."""
    resp = requests.get(
        f"{BASE_URL}/api/v1/molecules/download-sdf",
        headers=headers,
        allow_redirects=False,
    )
    pretty_print(
        "Molecules SDF response info",
        f"status={resp.status_code}, content-type={resp.headers.get('Content-Type')}, location={resp.headers.get('Location')}",
    )
    resp.raise_for_status()
    # Print only the first part to avoid flooding the console if large
    text = resp.text
    snippet = text[:1000] + ("\n... [truncated]" if len(text) > 1000 else "")
    pretty_print("Downloaded molecules SDF (snippet)", snippet)


def download_molecules_csv():
    """Test: GET /api/v1/molecules/download-csv (any API token)."""
    resp = requests.get(
        f"{BASE_URL}/api/v1/molecules/download-csv",
        headers=headers,
        allow_redirects=False,
    )
    pretty_print(
        "Molecules CSV response info",
        f"status={resp.status_code}, content-type={resp.headers.get('Content-Type')}, location={resp.headers.get('Location')}",
    )
    resp.raise_for_status()
    text = resp.text
    snippet = text[:1000] + ("\n... [truncated]" if len(text) > 1000 else "")
    pretty_print("Downloaded molecules CSV (snippet)", snippet)


def download_evaluations_csv_admin():
    """Test: GET /api/v1/evaluations/download-csv (admin token required)."""
    resp = requests.get(
        f"{BASE_URL}/api/v1/evaluations/download-csv",
        headers=headers,
        allow_redirects=False,
    )
    pretty_print(
        "Evaluations CSV response info",
        f"status={resp.status_code}, content-type={resp.headers.get('Content-Type')}, location={resp.headers.get('Location')}",
    )
    resp.raise_for_status()
    text = resp.text
    snippet = text[:1000] + ("\n... [truncated]" if len(text) > 1000 else "")
    pretty_print("Downloaded evaluations CSV (snippet)", snippet)


def generate_sdf_via_python_service():
    """Test: POST /api/v1/smiles-to-sdf (requires authenticated user)."""

    payload = {"smiles": "CCO"}
    resp = requests.post(
        f"{BASE_URL}/api/v1/smiles-to-sdf",
        json=payload,
        headers=headers,
    )
    pretty_print(
        "SMILES to SDF response info",
        f"status={resp.status_code}, content-type={resp.headers.get('Content-Type')}",
    )
    resp.raise_for_status()
    data = resp.json()
    sdf = data.get("sdf", "")
    snippet = sdf[:500] + ("\n... [truncated]" if len(sdf) > 500 else "")
    pretty_print("Generated SDF from SMILES (snippet)", snippet)


def compute_properties_from_sdf_via_python_service():
    """Test: POST /api/v1/sdf-properties (requires admin API token).

    Uses the same example SDF block as in create_single_molecule() and
    asks the python_service to compute basic molecular properties.
    """

    example_sdf = '''CHEMBL153534
     RDKit          2D

 16 17  0  0  0  0  0  0  0  0999 V2000
    7.6140  -22.2702    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    5.7047  -23.1991    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.1806  -22.5282    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    6.9604  -22.7690    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    4.8790  -23.2163    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    8.2791  -21.1119    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    7.5280  -21.4445    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.4225  -22.4364    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.8353  -21.7198    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.2035  -23.8527    0.0000 S   0  0  0  0  0  0  0  0  0  0  0  0
    4.0534  -23.2163    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.9776  -23.5889    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.6406  -22.4938    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    3.6406  -23.9215    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    8.4397  -20.3035    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.6552  -21.6280    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
  2  3  2  0
  3  4  1  0
  4  1  1  0
  5  2  1  0
  6  7  1  0
  7  1  2  0
  8  1  1  0
  9  8  2  0
 10 12  1  0
 11  5  2  3
 12  4  2  0
 13 11  1  0
 14 11  1  0
 15  6  1  0
 16  9  1  0
  6  9  1  0
 10  2  1  0
M  END
> <chembl_id>
CHEMBL153534

$$$$
'''

    payload = {"sdf": example_sdf}
    resp = requests.post(
        f"{BASE_URL}/api/v1/sdf-properties",
        json=payload,
        headers=headers,
    )
    pretty_print(
        "SDF properties response info",
        f"status={resp.status_code}, content-type={resp.headers.get('Content-Type')}",
    )
    resp.raise_for_status()
    data = resp.json()
    pretty_print("Computed properties from SDF", data)
    

def test_rf_predict():
    """Test: POST /api/v1/predict (authenticated user)."""
    payload = {"smiles": "CCO"}  # Ethanol example
    #resp = requests.post(
    #    f"http://localhost:8000/rf-predict",
    #    json=payload,
    #    headers=headers,
    #)
    resp = requests.post(
        f"{BASE_URL}/api/v1/predict",
        json=payload,
        headers=headers,
    )
    resp.raise_for_status()
    data = resp.json()
    pretty_print("Random Forest prediction result", data)



def main():
    pretty_print("Config", f"BASE_URL={BASE_URL}, token set={bool(API_TOKEN)}")

    # # 1) Create or get a single molecule (admin only)
    # try:
    #    create_single_molecule()
    # except Exception as exc:
    #    pretty_print("Error creating molecule", repr(exc))

    # # 2) Bulk upload molecules from SDF (admin only)
    # try:
    #    upload_sdf_admin()
    # except Exception as exc:
    #    pretty_print("Error uploading SDF", repr(exc))

    # # 3) Download all molecules as SDF (all API tokens)
    # try:
    #     download_molecules_sdf()
    # except Exception as exc:
    #     pretty_print("Error downloading SDF dataset", repr(exc))

    # # 4) Download all molecules as CSV (all API tokens)
    # try:
    #     download_molecules_csv()
    # except Exception as exc:
    #     pretty_print("Error downloading CSV dataset", repr(exc))

    # # 5) Download all evaluations as CSV (admin only)
    # try:
    #     download_evaluations_csv_admin()
    # except Exception as exc:
    #     pretty_print("Error downloading evaluations CSV", repr(exc))


    ####### testing API python_Service #######
    # # 1b) Call SMILES -> SDF API via Python service (authenticated user)
    # try:
    #     generate_sdf_via_python_service()
    # except Exception as exc:
    #     pretty_print("Error generating SDF via python-service", repr(exc))

    # 2b) Call SDF -> properties API via Python service (admin token)
    # try:
    #     compute_properties_from_sdf_via_python_service()
    # except Exception as exc:
    #     pretty_print("Error computing properties via python-service", repr(exc))


    try:
        test_rf_predict()
    except Exception as exc:
        pretty_print("Error calling RF Predict API", repr(exc))


if __name__ == "__main__":
    main()
