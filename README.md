# MolVE: An Open-Source Web Platform for Visualizing and Evaluating AI-Designed Molecules to Aid in Prioritization
This repository contains the code used to generate the results reported in the paper: [MolVE: An Open-Source Web Platform for Visualizing and Evaluating AI-Designed Molecules to Aid in Prioritization](https://pubs.acs.org/doi/10.1021/acs.jcim.5c02412).

```
@article{doi:10.1021/acs.jcim.5c02412,
  author  = {Rigoni, Davide and Sperduti, Alessandro and Moro, Stefano},
  title   = {MolVE: An Open-Source Web Platform for Visualizing and Evaluating AI-Designed Molecules to Aid in Prioritization},
  journal = {Journal of Chemical Information and Modeling},
  volume  = {0},
  number  = {0},
  pages   = {null},
  year    = {0},
  doi     = {10.1021/acs.jcim.5c02412},
  note    = {PMID: 41667067},
  URL     = {https://doi.org/10.1021/acs.jcim.5c02412},
  eprint  = {https://doi.org/10.1021/acs.jcim.5c02412}
}
```

MolVE is an open-source, web-based platform for collaborative, expert-driven assessment of molecules (e.g. AI-generated candidates). It provides secure authentication, dataset management (SDF import/export), a simple evaluation workflow (one molecule at a time), interactive 2D/3D visualisation (ChemDoodle + JSmol), and programmatic APIs (API tokens) for automation and integration.

The system is shipped as a Dockerised stack:

- Web app: React/Vite frontend + Node/Express backend (TypeScript)
- Database: PostgreSQL
- Optional microservice: Python/FastAPI + RDKit for molecular processing (SMILES↔SDF, property extraction, predictions)

If you are new to the platform, the in-app guide is the best starting point: open `/guide` once the app is running.

# Dependencies

Recommended (supported) way to run MolVE:

- Docker + Docker Compose

# Structure

This repository is organised as a small monorepo:

- `docker-compose.yaml` — development stack (bind-mounts source, exposes debug ports)
- `docker-compose.prod.yaml` — production-like stack (immutable images; HTTPS preferred)
- `services/app/` — TypeScript full-stack web app
	- `client/` — React frontend (pages, components, Tailwind)
	- `server/` — Express backend (API routes, auth, DB access)
	- `shared/` — shared schemas/types (frontend + backend)
	- `initial_configs/` — container startup scripts
- `services/python-service/` — FastAPI/RDKit microservice
- `services/db/` — Postgres volume location and init SQL
- `tests_tools_to_use/` — small files/scripts useful for local testing (e.g. SDF samples, Python API script)

# Usage

## Quick start (development)

Build and run the full stack:

```bash
docker compose -f docker-compose.yaml up --build
```

Then open:

- Web app (HTTP): http://localhost:5000
- Python service (dev only): http://localhost:8000

Default development ports exposed by `docker-compose.yaml`:

- `5000` web app (HTTP)
- `9229` Node.js inspector (only if you attach a debugger)
- `8000` Python service (debug/development)
- `5432` PostgreSQL (debug/development)

Stop the stack:

```bash
docker compose -f docker-compose.yaml down
```

## First login

On startup, the backend will create an initial admin user if it does not exist yet:

- username: `admin`
- password: `admin`

Log in at `/login`, then open `/admin-dashboard` to create evaluator accounts, upload molecules, and configure evaluation settings.

## Production-like run

Run using the production compose file:

```bash
docker compose -f docker-compose.prod.yaml up --build
```

In production mode the app prefers HTTPS on port `443`. A self-signed certificate is generated automatically inside the container if missing.

If you don’t want HTTPS, you can remove the `443:443` port mapping in `docker-compose.prod.yaml` or provide your own certificate paths via `SSL_CERT_PATH` / `SSL_KEY_PATH`.

## Common workflows

- Upload molecules: use the admin dashboard to upload SDF files (the backend will call the Python/RDKit service to parse/process them).
- Evaluate molecules: evaluators typically use `/user-evaluation` to rate one molecule at a time.
- Export results: admins can download molecules/evaluations as CSV/SDF from the admin dashboard.

## API tokens and programmatic access

MolVE supports per-user API tokens for programmatic access. Create tokens from the UI, then call versioned endpoints under `/api/v1/...` with:

```
Authorization: Bearer <token>
```

Some endpoints are restricted to admin-owned tokens (for example, bulk import endpoints). Prediction is available via `POST /api/v1/predict` and the stable alias `POST /api/predict`.

For a working Python example, see `tests_tools_to_use/test_python_api.py`.

# Notes

- Upload limits: the maximum SDF upload size is controlled by `100MB` (see the compose files).
- MolVE was tested on a low-resource AWS EC2 `t3.micro` instance located in Stockholm, equipped with 2 vCPUs and 1 GB of RAM. Under this setup, MolVE effectively handled datasets suitable for human evaluation. Specifically, it has been tested with datasets containing up to 10,000 molecules without issues. The system was configured to accept SDF files up to 100MB in size, with the capability to upload them multiple times. While uploading large files may take additional time, primarily due to variations in internet connection speed, molecule processing itself is efficiently expedited by directly parsing the SDF file as text, eliminating the need for additional packages. The ML model's prioritization score is computed in the background within MolVE's backend. Initially, the ML predictions are displayed as ``Pending,'' but they are updated in real-time once calculated, allowing users to continue their workflow without interruption.


# License

Apache License, Version 2.0
