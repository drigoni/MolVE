import os
import pathlib
import requests

#export API_TOKEN=MTAtMTc2NDYwNTE2NTg0OC05YXkxaW1oaGtmaQ
#export BASE_URL=http://localhost:5000

#BASE_URL = os.getenv("BASE_URL", "http://localhost:5000")
#API_TOKEN = os.getenv("API_TOKEN", "")

API_TOKEN="MTAtMTc2NDYwNTE2NTg0OC05YXkxaW1oaGtmaQ"
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
    payload = {
        "smiles": "CCO",
        "molecularWeight": "46.07",
        "logP": "-0.3",
        "hbd": 1,
        "hba": 1,
        "sas": "2.5",
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
    #try:
    #    create_single_molecule()
    #except Exception as exc:
    #    pretty_print("Error creating molecule", repr(exc))

    # 2) Bulk upload molecules from SDF (admin only)
    #try:
    #    upload_sdf_admin()
    #except Exception as exc:
    #    pretty_print("Error uploading SDF", repr(exc))

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
