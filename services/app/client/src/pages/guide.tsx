import React, { useState } from "react";
import { NavigationHeader } from "@/components/navigation-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GuidePage: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("introduction");

  return (
    <div className="min-h-screen bg-lab-bg">
      <NavigationHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
            MolVE: Project Guide
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Learn how to use MolVE as an admin or evaluator, how to call the API, and how the system is structured and deployed.
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="introduction">Overview</TabsTrigger>
            <TabsTrigger value="roles">User types</TabsTrigger>
            <TabsTrigger value="api">API & routes</TabsTrigger>
            <TabsTrigger value="admin-workflow">Admin guide</TabsTrigger>
            <TabsTrigger value="evaluator-workflow">Evaluator guide</TabsTrigger>
            <TabsTrigger value="architecture">Architecture</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="introduction">
            <section className="space-y-4 guide-prose">
              <h2 className="text-2xl font-semibold">Overview of the project</h2>
              <p>
                Advances in artificial intelligence and deep generative models have 
                enabled the rapid generation of novel molecular structures for advanced 
                material science and drug discovery. However, the effective evaluation of 
                these candidates still depends, in the end, on expert judgment, which is 
                often fragmented and difficult to scale. MolVE is an open-source, web-based 
                platform designed to support collaborative, expert-driven assessment of 
                AI-generated molecules. The platform combines secure user authentication, 
                dataset management,  Machine Learning (MLG) and Deep Learning (DL) models, 
                interactive 2D/3D visualizations,  and exposes APIs to interact with it directly 
                from each coding language, e.g., Python. It enables chemists and pharmacologists 
                to curate, annotate, and evaluate molecules efficiently. 
                A descriptive rating scale captures qualitative feedback, facilitating clear 
                communication and consensus among experts. 
              </p>
              <p>
                MolVE is implemented as a full‑stack TypeScript application with a
                Node.js/Express backend, a React/Vite frontend, a PostgreSQL
                database, and an optional Python microservice (RDKit‑based) for
                molecular processing. Everything is containerised with Docker so it
                can be deployed reproducibly on a laptop, lab server, or cloud instance.
                This setup enables scalable deployment in both academic and industrial settings. 
                By incorporating detailed human evaluation into molecular generation, 
                MolVE addresses a significant challenge in AI-driven molecule discovery. 
              </p>
              <p className="mt-2">
                If you are new to MolVE, you can skim this page like a
                short handbook: start with <span className="font-medium">User types</span>{" "}
                to understand admin vs evaluator, follow the <span className="font-medium">Admin guide</span>{" "} 
                to set up a study, share the <span className="font-medium">Evaluator guide</span> with evaluators,
                and refer to <span className="font-medium">API & routes</span>{" "}
                and <span className="font-medium">Architecture & deployment</span> when you
                integrate or extend the system.
              </p>

              <h2 className="text-2xl font-semibold">Key features</h2>
              <p>MolVE offers the following main capabilities:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Role‑based access</strong> – separate admin and user
                  roles, plus optional guest viewing.
                </li>
                <li>
                  <strong>Admin dashboard</strong> – overview cards, charts, and
                  tables for molecules and evaluations.
                </li>
                <li>
                  <strong>Interactive visualisation</strong> – integrated
                  ChemDoodle (2D) and JSmol (3D) viewers.
                </li>
                <li>
                  <strong>Simple evaluation workflow</strong> – one‑molecule‑at‑a‑time
                  evaluation with ratings, notes, and flags.
                </li>
                <li>
                  <strong>Dataset management</strong> – SDF upload, per‑molecule
                  and bulk deletion, and CSV/SDF export.
                </li>
                <li>
                  <strong>API tokens</strong> – per‑user tokens for programmatic
                  access to CSV/SDF exports or automation.
                </li>
                <li>
                  <strong>Containerised stack</strong> – all major services run
                  as Docker containers for reproducible deployment.
                </li>
              </ul>
            </section>
          </TabsContent>

          {/* USER TYPES / ACCESS */}
          <TabsContent value="roles">
            <section className="space-y-4 guide-prose">
              <h2 className="text-2xl font-semibold">User types & access</h2>
              <p>
                MolVE distinguishes three perspectives on the same system: the
                <span className="font-medium"> admin</span> who curates datasets and
                configures the study, the <span className="font-medium">evaluator</span> who
                inspects and rates molecules, and the optional
                <span className="font-medium"> guest</span> who can only view examples.
                All permissions are enforced by the backend using sessions and
                role checks.
              </p>

              <h3 className="text-lg font-semibold mt-2">Admin</h3>
              <p>
                An admin is responsible for preparing and running an evaluation
                campaign. After logging into <span className="code">/admin-dashboard</span>, the
                admin can upload new SDF datasets, decide which molecules are
                shown to evaluators, and configure how results are stored and
                exported. Typical admin actions include:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Open the <span className="font-medium">Users</span> tab to create
                  evaluator accounts and additional admins. This internally uses
                  the <span className="code">/api/admin/users</span> endpoints to add, edit, and
                  delete users.
                </li>
                <li>
                  Use the <span className="font-medium">Molecules</span> tab to upload
                  SDF files via <span className="code">POST /api/admin/molecules/upload-sdf</span> and
                  to inspect or remove stored molecules. This defines the pool
                  of structures that evaluators will see.
                </li>
                <li>
                  Go to the <span className="font-medium">Settings</span> tab to set the
                  evaluation mode through <span className="code">POST /api/admin/evaluation-mode</span>
                  and to enable or disable guest viewing via
                  <span className="code">POST /api/admin/settings</span>. These options control which
                  molecules are sampled for each user and whether the
                  <span className="code">/guest-viewer</span> page is publicly visible.
                </li>
                <li>
                  Use the <span className="font-medium">Overview</span> and
                  <span className="font-medium"> Evaluations</span> tabs to monitor how
                  many evaluations have been submitted, then download results as
                  CSV with the download buttons. These call
                  <span className="code">GET /api/admin/molecules/download</span> and
                  <span className="code">GET /api/admin/download/evaluations</span> so data can be
                  analysed in external tools.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Evaluator</h3>
              <p>
                An evaluator logs in and spends most of the time on
                <span className="code">/user-evaluation</span>. The evaluator does not change
                global settings or datasets; instead, they look at one molecule
                at a time and provide judgements that are later interpreted by
                admins and analysts.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  After login, the evaluator opens
                  <span className="code">/user-evaluation</span>, where the app automatically
                  fetches a molecule from <span className="code">GET /api/molecules/random</span>.
                  The sampling respects the evaluation mode chosen by the
                  admin.
                </li>
                <li>
                  For each molecule, the evaluator inspects the 2D and 3D
                  viewers, the physico‑chemical properties, and any ML
                  prediction shown in the interface, then selects a qualitative
                  category such as "prioritize", "borderline", or "do not
                  prioritize".
                </li>
                <li>
                  The evaluator can add free‑text notes and tick issue flags
                  (e.g. solubility, synthetic accessibility, dimension,
                  permeability). When the form is submitted, the client sends
                  the decision to <span className="code">POST /api/evaluations</span> and
                  automatically loads the next molecule.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Guest</h3>
              <p>
                A guest is a read‑only viewer that does not need an account.
                When guest viewing is enabled by the admin, anyone can open
                <span className="code">/guest-viewer</span> to explore a subset of molecules and
                see their structures and basic properties.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Guests cannot log in, rate molecules, or store notes.</li>
                <li>
                  This mode is mainly intended for demonstrations, teaching
                  sessions, or sharing examples with non‑expert audiences.
                </li>
              </ul>

              <p className="mt-2">
                Access to each API route is restricted by these roles. For a
                complete, endpoint‑by‑endpoint description, see the
                <span className="font-medium"> API & routes</span> tab.
              </p>
            </section>
          </TabsContent>

          {/* API & ROUTES */}
          <TabsContent value="api">
            <section className="space-y-4 guide-prose">
              <h2 className="text-2xl font-semibold">API & routes</h2>
              <p>
                The backend exposes a JSON HTTP API under paths like
                {" "}
                <span className="code">/api/...</span>. The React frontend calls these endpoints via
                the <span className="code">apiRequest</span> helper. Users can also use API
                tokens for programmatic access allowing users to interact directly with MolVE through
                the code used to implement Machine Learning and Deep Learning models, e.g. Python scripts.
              </p>
              <p>
                For creating a new APIs, goes to the <span className="font-medium">API access</span>{" "} 
                page and click on <span className="font-medium">Create New API Token</span>.
                For tokens, send a
                {" "}
                <span className="code">Bearer &lt;token&gt;</span> in the <span className="code">Authorization</span>
                {" "}
                header. Errors use appropriate HTTP status codes with small JSON
                messages.
              </p>
              <p>
                Follow a description of the main endpoints below, grouped by functionality. 
                Note that only those starting with <span className="code">/api/v1/...</span> are accessible thorugh APIs. 
              </p>

              <h3 className="text-lg font-semibold">Authentication</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">POST /api/login</span>{" "}
                  – login with username/password, creates a session cookie
                  <span className="text-xs align-middle ml-1">(any user)</span>.
                </li>
                <li>
                  <span className="code">POST /api/logout</span>{" "}
                  – destroy current session
                  <span className="text-xs align-middle ml-1">(logged‑in users)</span>.
                </li>
                <li>
                  <span className="code">GET /api/auth/user</span>{" "}
                  – return current user id, username, and role
                  <span className="text-xs align-middle ml-1">(logged‑in users)</span>.
                </li>
                <li>
                  <span className="code">POST /api/auth/change-password</span>{" "}
                  – change password for the current admin user
                  <span className="text-xs align-middle ml-1">(admin only)</span>.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">API tokens (per user)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">GET /api/api-tokens</span>{" "}
                  – list tokens for the logged‑in user.
                </li>
                <li>
                  <span className="code">POST /api/api-tokens</span>{" "}
                  – create a new API token.
                </li>
                <li>
                  <span className="code">DELETE /api/api-tokens/:id</span>{" "}
                  – revoke a token (owner or admin only).
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Admin: molecules</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">GET /api/admin/molecules</span>{" "}
                  – list all stored molecules.
                </li>
                <li>
                  <span className="code">GET /api/admin/molecules/stats</span>{" "}
                  – molecules with evaluation counts.
                </li>
                <li>
                  <span className="code">POST /api/admin/molecules/upload-sdf</span>{" "}
                  – upload an SDF file (multipart field <code>sdf</code>);
                  molecules are processed with the Python/RDKit service.
                </li>
                <li>
                  <span className="code">DELETE /api/admin/molecules/:id</span>{" "}
                  – delete one molecule.
                </li>
                <li>
                  <span className="code">DELETE /api/admin/molecules</span>{" "}
                  – delete all molecules.
                </li>
                <li>
                  <span className="code">GET /api/admin/molecules/download</span>{" "}
                  – download molecules as CSV (used by the admin dashboard
                  download button).
                </li>
                <li>
                  <span className="code">GET /api/admin/molecules/download-sdf</span>{" "}
                  – download molecules as SDF.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Admin: evaluations & settings</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">GET /api/admin/evaluations</span>{" "}
                  – list evaluations with molecule context.
                </li>
                <li>
                  <span className="code">DELETE /api/admin/evaluations/:id</span>{" "}
                  – delete a single evaluation.
                </li>
                <li>
                  <span className="code">GET /api/admin/download/evaluations</span>{" "}
                  – download evaluations as CSV (used by the admin dashboard
                  download button).
                </li>
                <li>
                  <span className="code">GET /api/admin/evaluation-mode</span>{" "}
                  – get current evaluation mode (
                  <span className="code">all</span>, <span className="code">unevaluated</span>, or
                  {" "}
                  <span className="code">unevaluated_by_label</span>).
                </li>
                <li>
                  <span className="code">POST /api/admin/evaluation-mode</span>{" "}
                  – update evaluation mode. Body:
                  {" "}
                  <span className="code">
                    {'{ "mode": "all" | "unevaluated" | "unevaluated_by_label" }'}
                  </span>
                  .
                </li>
                <li>
                  <span className="code">GET /api/admin/settings</span>{" "}
                  – get admin‑configurable settings such as
                  {" "}
                  <span className="code">allowGuestViewing</span>.
                </li>
                <li>
                  <span className="code">POST /api/admin/settings</span>{" "}
                  – update admin settings.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Admin: users</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">GET /api/admin/users</span>{" "}
                  – list all users (admin and user).
                </li>
                <li>
                  <span className="code">POST /api/admin/users</span>{" "}
                  – create a new user.
                </li>
                <li>
                  <span className="code">PUT /api/admin/users/:id</span>{" "}
                  – update username, password, or role for a user.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Evaluator endpoints</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">GET /api/molecules/random</span>{" "}
                  – fetch a random molecule according to the current evaluation
                  mode (all vs unevaluated for that user).
                </li>
                <li>
                  <span className="code">POST /api/evaluations</span>{" "}
                  – submit an evaluation for a molecule (rating, notes,
                  structural issue flags).
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Programmatic API (versioned)</h3>
              <p>
                These endpoints are intended for programmatic access using API tokens
                (see <span className="code">tests_tools_to_use/test_python_api.py</span> for examples
                using <span className="code">requests</span>). All of them require an
                <span className="code">Authorization: Bearer &lt;token&gt;</span> header; some are
                restricted to tokens owned by admin users.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <span className="code">POST /api/v1/molecules</span>{" "}
                  – create or fetch a molecule by SMILES. Requires an <span className="font-medium">admin‑owned</span> token. 
                  Body icludes SMILES, basic properties (molecular weight, logP,
                  HBD/HBA, SAS), optional SDF, and the NPS fields
                  (<span className="code">nps</span>, <span className="code">npsConfidence</span>).
                </li>
                <li>
                  <span className="code">POST /api/v1/molecules/upload-sdf</span>{" "}
                  – bulk‑import molecules from an SDF file
                  (<span className="code">multipart/form-data</span> field <span className="code">sdf</span>).
                </li>
                <li>
                  <span className="code">GET /api/v1/molecules/download-sdf</span>{" "}
                  – download the stored molecules as an SDF dataset.
                </li>
                <li>
                  <span className="code">GET /api/v1/molecules/download-csv</span>{" "}
                  – download the stored molecules as CSV.
                </li>
                <li>
                  <span className="code">GET /api/v1/evaluations/download-csv</span>{" "}
                  – download the evaluations dataset as CSV.
                </li>
                <li>
                  <span className="code">POST /api/v1/smiles-to-sdf</span>{" "}
                  – proxy to the Python service to generate a 3D SDF from a SMILES
                  string.
                </li>
                <li>
                  <span className="code">POST /api/v1/sdf-properties</span>{" "}
                  – proxy to the Python service to compute molecular properties
                  from an SDF block.
                </li>
                <li>
                  <span className="code">POST /api/v1/predict</span>{" "}
                  – proxy to the Python <span className="code">/rf-predict</span> endpoint to obtain a
                  random‑forest priority score for a SMILES.
                </li>
                <li>
                  <span className="code">POST /api/predict</span>{" "}
                  – stable alias that forwards to <span className="code">/api/v1/predict</span>.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Python usage example</h3>
              <p>
                The following Python snippet shows how to request a prediction
                score for a single SMILES string using the
                {" "}
                <span className="code">/api/v1/predict</span> endpoint (or its
                stable alias <span className="code">/api/predict</span>). Replace
                {" "}
                <span className="code">BASE_URL</span>,
                {" "}
                <span className="code">API_TOKEN</span>, and the example
                SMILES with your own values.
              </p>
              <pre className="bg-slate-900 text-slate-100 text-sm p-4 rounded-md overflow-x-auto">
                {`import requests

BASE_URL = "http://localhost:5000"  # or your deployed URL
API_TOKEN = "YOUR_API_TOKEN_HERE"

smiles = "CCO"  # example SMILES (ethanol)

url = f"{BASE_URL}/api/predict"  # or "/api/v1/predict"
headers = {"Authorization": f"Bearer {API_TOKEN}", "Content-Type": "application/json"}
payload = {"smiles": smiles}

response = requests.post(url, json=payload, headers=headers, timeout=30)
response.raise_for_status()  # raise an error for HTTP 4xx/5xx

data = response.json()
print("Prediction response:", data)

score = data.get("score") or data.get("prediction")
print("Predicted priority score:", score)`}
              </pre>

              <p className="mt-4">
                The authoritative source of truth for available routes is
                {" "}
                <span className="code">server/routes.ts</span>. If you modify or extend the API,
                update this guide together with that file.
              </p>
            </section>
          </TabsContent>

          {/* ADMIN GUIDE */}
          <TabsContent value="admin-workflow">
            <section className="space-y-4 guide-prose">
              <h2 className="text-2xl font-semibold">Admin guide</h2>
              <p>
                This section explains how an admin uses the interface to
                configure the evaluation behaviour, manage users, and make
                molecules available.
              </p>

              <h3 className="text-lg font-semibold mt-2">1. Log in as admin</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the MolVE web application in your browser.</li>
                <li>Go to the <span className="code">/login</span> page.</li>
                <li>Enter your admin credentials (username and password).</li>
                <li>
                  Click <strong>Log in</strong>. You will be redirected to the
                  main dashboard or admin dashboard.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">2. Explore the admin dashboard</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  After logging in as an admin, open the
                  {" "}
                  <span className="code">/admin-dashboard</span> page from the navigation bar.
                </li>
                <li>
                  The Overview tab shows high‑level statistics such as the
                  number of molecules, evaluations, and evaluation categories.
                </li>
                <li>
                  Other tabs provide access to molecules, evaluations, users,
                  settings, and diagnostics.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">3. Create or manage users</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the <strong>Users</strong> tab on the admin dashboard.</li>
                <li>
                  Click <strong>New user</strong> to open the user creation
                  dialog.
                </li>
                <li>
                  Fill in:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li><strong>Username</strong> – unique login name.</li>
                    <li><strong>Password</strong> – initial password.</li>
                    <li>
                      <strong>Role</strong> – choose <span className="code">user</span> for
                      evaluators or <span className="code">admin</span> for administrators.
                    </li>
                  </ul>
                </li>
                <li>
                  Click <strong>Create</strong>. The new user appears in the
                  users table.
                </li>
                <li>
                  To edit a user later, use the edit icon in the table; you can
                  change username, password, and role.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">4. Upload molecules from SDF</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Go to the <strong>Molecules</strong> tab in the admin
                  dashboard.
                </li>
                <li>
                  Use the SDF upload control to select an SDF file containing
                  molecules with the required physicochemical properties
                  (molecular weight, logP, HBD/HBA, SAS, NPS and NPS
                  confidence). Molecules that are missing any of these fields or
                  a valid SMILES will be skipped.
                </li>
                <li>
                  MolVE will send the file to
                  {" "}
                  <span className="code">/api/admin/molecules/upload-sdf</span>, which parses the
                  file, calls the Python/RDKit service, and stores molecules in
                  PostgreSQL.
                </li>
                <li>
                  If a molecule has a new SMILES (not yet in the database), it
                  is inserted with the label you provided in the upload form.
                  If a molecule has a SMILES that already exists:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1 text-sm text-gray-700">
                    <li>
                      If the existing label is the same as the new label (or
                      both are empty), the molecule is skipped.
                    </li>
                    <li>
                      If the existing label is non‑empty and the new label is
                      empty, the molecule is treated as already present and the
                      label is left unchanged (no new dataset tag is added).
                    </li>
                    <li>
                      If the existing label is empty and the new label is
                      non‑empty, the new label becomes the label for that
                      molecule (effectively tagging a previously unlabelled
                      structure).
                    </li>
                    <li>
                      If the existing label is non‑empty and different from the
                      new non‑empty label, the new label is appended to the
                      existing one, separated by
                      {" "}
                      <span className="code">;</span>
                      (e.g. <span className="code">"SetA;SetB"</span>), so you can track that the
                      same structure appears in multiple datasets.
                    </li>
                  </ul>
                </li>
                <li>
                  Once complete, a toast will report how many molecules were
                  processed vs skipped.
                </li>
                <li>
                  You can delete individual molecules or all molecules from this
                  tab when needed.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">5. Configure evaluation behaviour</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  In the <strong>Settings</strong> tab, choose the evaluation
                  mode (<span className="code">all</span> molecules vs only
                  {" "}
                  <span className="code">unevaluated</span> molecules for each user). This
                  controls how <span className="code">/api/molecules/random</span> behaves.
                </li>
                <li>
                  Toggle <strong>Guest viewing</strong> if you want to expose a
                  read‑only molecule viewer to unauthenticated users.
                </li>
                <li>
                  Optionally change the admin password via the
                  {" "}
                  <strong>Change password</strong> card.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">6. Monitor and export results</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Use the <strong>Overview</strong> and
                  {" "}
                  <strong>Evaluations</strong> tabs to see counts and
                  distributions of evaluations.
                </li>
                <li>
                  Download molecule and evaluation datasets with the
                  {" "}
                  <strong>Download</strong> buttons, which call the CSV download
                  endpoints.
                </li>
                <li>
                  Use these CSVs in your own analysis pipelines or for
                  archiving.
                </li>
              </ol>
            </section>
          </TabsContent>

          {/* EVALUATOR GUIDE */}
          <TabsContent value="evaluator-workflow">
            <section className="space-y-4 guide-prose">
              <h2 className="text-2xl font-semibold">Evaluator guide</h2>
              <p>
                This section explains how an evaluator uses MolVE to inspect
                molecules and submit evaluations from the
                {" "}
                <span className="code">/user-evaluation</span> page.
              </p>

              <h3 className="text-lg font-semibold mt-2">1. Log in</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the MolVE web application in your browser.</li>
                <li>Navigate to the <span className="code">/login</span> page.</li>
                <li>Enter the username and password provided by your admin.</li>
                <li>
                  After successful login, go to the
                  {" "}
                  <span className="code">/user-evaluation</span> page from the navigation
                  header.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">2. Get a molecule to evaluate</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  When the page loads, it automatically requests a random
                  molecule from <span className="code">/api/molecules/random</span>.
                </li>
                <li>
                  Use the "Next molecule" action to fetch new molecules, obeying
                  the evaluation mode configured by the admin.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">3. Use the molecular viewers</h3>
              <p>The evaluation screen typically shows:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  A <strong>2D viewer</strong> based on ChemDoodle, embedded via
                  <span className="code">react-chemdoodle</span>.
                </li>
                <li>
                  A <strong>3D viewer</strong> powered by JSmol for interactive
                  rotation and zoom based on the stored SDF.
                </li>
                <li>
                  Molecule metadata such as SMILES and identifiers, as stored in
                  the database.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">4. Fill in the evaluation form</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  Select an overall evaluation category (e.g.
                  {" "}
                  "promising", "uncertain", "not suitable").
                </li>
                <li>
                  Optionally add <strong>notes</strong> describing your reasoning
                  or caveats.
                </li>
                <li>
                  Tick structural <strong>issue flags</strong> where relevant
                  (e.g. solubility, synthetic accessibility, dimension,
                  permeability).
                </li>
                <li>
                  Click <strong>Submit evaluation</strong>. The app posts to
                  {" "}
                  <span className="code">/api/evaluations</span> and then automatically loads the
                  next molecule.
                </li>
              </ol>

              <h3 className="text-lg font-semibold mt-4">5. Troubleshooting</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  If you are logged out or your session expires, you will see an
                  unauthorized error and be redirected to <span className="code">/login</span>.
                </li>
                <li>
                  If no SDF data is available for a molecule, the 3D view may
                  not render; report this to the admin so the dataset can be
                  fixed.
                </li>
              </ul>
            </section>
          </TabsContent>

          <TabsContent value="architecture">
            <section className="space-y-4 guide-prose">
              <h2 className="text-2xl font-semibold">Architecture, project structure & deployment</h2>
              <p>
                MolVE is organised as a small monorepo with three main services running in Docker:
                a TypeScript web app (React + Express), a PostgreSQL database, and a Python/RDKit
                microservice. Development and production setups are defined in
                {" "}
                <span className="code">docker-compose.yaml</span>
                {" "}
                and
                {" "}
                <span className="code">docker-compose.prod.yaml</span>
                .
              </p>
              <h3 className="text-lg font-semibold">Repository layout</h3>
              <p>The main folders you will interact with are:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>services/app/client/src/</strong> – React frontend,
                  including pages (e.g. <span className="code">login</span>,
                  {" "}
                  <span className="code">dashboard</span>, <span className="code">user-evaluation</span>,
                  <span className="code">admin-dashboard</span>, <span className="code">guest-viewer</span>,
                  <span className="code">user-api-tokens</span>, <span className="code">guide</span>), shared UI
                  components, hooks, and utilities.
                </li>
                <li>
                  <strong>services/app/client/public/</strong> – static assets
                  and third‑party libraries, including ChemDoodle and JSmol
                  distributions and example HTML files.
                </li>
                <li>
                  <strong>services/app/server/</strong> – Node.js/Express backend:
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>
                      <span className="code">auth.ts</span> – session setup, login/logout,
                      current user, and admin password change.
                    </li>
                    <li>
                      <span className="code">routes.ts</span> – main HTTP routes for molecules,
                      evaluations, users, settings, and API tokens.
                    </li>
                    <li>
                      <span className="code">db.ts</span> – database access via Drizzle ORM.
                    </li>
                    <li>
                      <span className="code">services/molecular.ts</span> – integration with the
                      Python service for SDF processing.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>services/app/shared/</strong> – shared TypeScript schemas and types
                  used by both frontend and backend (imported as
                  {" "}
                  <span className="code">@shared/schema</span>).
                </li>
                <li>
                  <strong>services/python-service/</strong> – FastAPI‑based
                  RDKit service with routes for health checks, SMILES→SDF, SDF
                  property extraction, and random‑forest predictions.
                </li>
                <li>
                  <strong>services/db/</strong> – Postgres volume
                  configuration and init SQL (mounted inside the DB container
                  as <span className="code">/var/lib/postgresql/data</span> and
                  {" "}
                  <span className="code">/docker-entrypoint-initdb.d</span>).
                </li>
                <li>
                  <strong>backup/</strong> and
                  {" "}
                  <strong>services/app/initial_configs/</strong>
                  {" "}
                  – SQL initialisation scripts, CSV seeds, and historical
                  configuration files used for seeding and experiments.
                </li>
                <li>
                  <strong>tests_tools_to_use/</strong> – helper files and
                  examples used for testing or development.
                </li>
              </ul>
              <h3 className="text-lg font-semibold mt-4">Technology stack</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Frontend</strong> – React + TypeScript + Vite, styled
                  with Tailwind CSS.
                </li>
                <li>
                  <strong>Backend</strong> – Node.js + Express (TypeScript),
                  providing the JSON API and serving the app.
                </li>
                <li>
                  <strong>Database</strong> – PostgreSQL for users, molecules,
                  evaluations, settings, and sessions.
                </li>
                <li>
                  <strong>ORM</strong> – Drizzle ORM for typed queries and
                  migrations (see <span className="code">drizzle.config.ts</span>).
                </li>
                <li>
                  <strong>Authentication</strong> – Express sessions stored in
                  PostgreSQL via <span className="code">connect-pg-simple</span>.
                </li>
                <li>
                  <strong>Molecular tooling</strong> – ChemDoodle and JSmol on
                  the frontend, RDKit via the Python microservice.
                </li>
              </ul>

              <h3 className="text-lg font-semibold mt-4">Containers and interactions</h3>
              <p>
                Both development and production deployments are defined via
                Docker Compose:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>
                  <span className="code">docker-compose.yaml</span> – development setup. Binds
                  source folders into the <span className="code">app</span> container, exposes
                  the Node dev server on <span className="code">5000</span>, the Node inspector
                  on <span className="code">9229</span>, the Python service on
                  {" "}
                  <span className="code">8000</span>, and Postgres on
                  {" "}
                  <span className="code">5432</span>. Hot‑reload is available via Vite.
                </li>
                <li>
                  <span className="code">docker-compose.prod.yaml</span> – production setup.
                  Builds the same images but runs the Node app with
                  <span className="code">npm run start</span> and does not bind‑mount source or
                  expose internal service ports to the host.
                </li>
              </ul>
              <p className="mt-2">
                The following logical services are defined in both compose files:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>Web app container</strong> (Node/React):
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>
                      Runs the Vite dev server or compiled frontend together
                      with the Express backend.
                    </li>
                    <li>
                      Exposes HTTP endpoints under <span className="code">/api/...</span> and
                      serves the React SPA.
                    </li>
                    <li>
                      Connects to PostgreSQL using <span className="code">DATABASE_URL</span> and
                      uses Drizzle for queries.
                    </li>
                    <li>
                      Calls the Python service over HTTP for RDKit‑based SDF
                      parsing and property calculation when SDF files are
                      uploaded.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Database container</strong> (PostgreSQL):
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>
                      Stores tables for users, molecules, evaluations, settings,
                      sessions, and API tokens.
                    </li>
                    <li>
                      Uses a Docker volume from <span className="code">docker_storages/</span> for
                      persistent storage (see <span className="code">services/db/docker_storages/postgres</span>).
                    </li>
                    <li>
                      Is initialised with SQL scripts from
                      {" "}
                      <span className="code">services/db/init/init-db.sql</span> (and, for
                      experiments, CSVs in the <span className="code">initial_configs</span>
                      folders).
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Python service container</strong> (FastAPI + RDKit):
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>
                      Built from <span className="code">services/python-service/Dockerfile</span>
                      with dependencies from
                      {" "}
                      <span className="code">services/python-service/requirements.txt</span>.
                    </li>
                    <li>
                      Exposes routes from
                      {" "}
                      <span className="code">services/python-service/routes/</span> such
                      as <span className="code">/health</span>, <span className="code">/smiles-to-sdf</span>,
                      <span className="code">/sdf-properties</span>, and
                      {" "}
                      <span className="code">/rf-predict</span>.
                    </li>
                    <li>
                      Used by the Node backend when importing SDFs to compute
                      molecular descriptors (molecular weight, LogP, HBD/HBA,
                      SAS, NPS, etc.).
                    </li>
                  </ul>
                </li>
              </ul>

              <p className="mt-4">The overall data flow is:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  A user interacts with the React frontend in their browser
                  (pages under <span className="code">services/app/client/src/pages</span>).
                </li>
                <li>
                  The frontend calls the Express backend
                  (<span className="code">services/app/server/</span>) for login, molecules,
                  evaluations, users, and settings.
                </li>
                <li>
                  The backend reads/writes data in PostgreSQL with Drizzle.
                </li>
                <li>
                  When uploading SDF files or requesting derived properties, the
                  backend forwards data to the Python/RDKit service and stores
                  the returned descriptors and SDF.
                </li>
              </ol>
            </section>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default GuidePage;