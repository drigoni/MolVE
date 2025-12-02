import os
import pathlib
import requests

#export API_TOKEN=MTAtMTc2NDYwNTE2NTg0OC05YXkxaW1oaGtmaQ
#export BASE_URL=http://localhost:5000

#BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")
#API_TOKEN = os.getenv("API_TOKEN", "")

# API_TOKEN="MTAtMTc2NDYwNTE2NTg0OC05YXkxaW1oaGtmaQ"
API_TOKEN = "MTEtMTc2NDY4OTk3NTIyNi15Y2xkcWY4aXl1ag"
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


def main():
    pretty_print("Config", f"BASE_URL={BASE_URL}, token set={bool(API_TOKEN)}")

    # 1) Create or get a single molecule (admin only)
    try:
       create_single_molecule()
    except Exception as exc:
       pretty_print("Error creating molecule", repr(exc))

    # 2) Bulk upload molecules from SDF (admin only)
    try:
       upload_sdf_admin()
    except Exception as exc:
       pretty_print("Error uploading SDF", repr(exc))

    # 3) Download all molecules as SDF (all API tokens)
    try:
        download_molecules_sdf()
    except Exception as exc:
        pretty_print("Error downloading SDF dataset", repr(exc))

    # 4) Download all molecules as CSV (all API tokens)
    try:
        download_molecules_csv()
    except Exception as exc:
        pretty_print("Error downloading CSV dataset", repr(exc))

    # 5) Download all evaluations as CSV (admin only)
    try:
        download_evaluations_csv_admin()
    except Exception as exc:
        pretty_print("Error downloading evaluations CSV", repr(exc))


if __name__ == "__main__":
    main()
