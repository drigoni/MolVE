import os
import requests

BASE_URL = "http://localhost:5000"
API_TOKEN = "MTAtMTc2NDU5MzkyNDA1NC1iY3IwMGd0anQyag"

if not API_TOKEN:
    raise SystemExit("Set API_TOKEN env var to one of your tokens")

headers = {"Authorization": f"Bearer {API_TOKEN}"}

# Example: add a molecule
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
print("Created/found molecule:", resp.json())

# Example: get a random molecule
resp = requests.get(f"{BASE_URL}/api/v1/molecules/next", headers=headers)
resp.raise_for_status()
print("Random molecule:", resp.json())
