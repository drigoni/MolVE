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
          <h1 className="text-3xl font-source font-bold text-gray-900 mb-2 text-center">
            MolVE: Project Guide
          </h1>
          <p className="text-gray-600 text-center max-w-3xl mx-auto">
            Learn how to use MolVE as an admin or evaluator, how to call the API, and how the system is structured and deployed.
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="introduction">Overview</TabsTrigger>
            <TabsTrigger value="roles">User types</TabsTrigger>
            <TabsTrigger value="api">API & routes</TabsTrigger>
            <TabsTrigger value="admin-workflow">Admin guide</TabsTrigger>
            <TabsTrigger value="evaluator-workflow">Evaluator guide</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="architecture">Architecture & deployment</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="introduction">
            <section className="space-y-4">
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
              <p className="mt-2">If you are new to MolVE, in this guide you will find:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Read <strong>User types</strong> to understand admin vs evaluator.</li>
                <li>Follow the <strong>Admin guide</strong> to set up a study.</li>
                <li>Share the <strong>Evaluator guide</strong> with evaluators.</li>
                <li>
                  Use <strong>API & routes</strong> and <strong>Structure / Implementation</strong>
                  {" "}
                  if you integrate or extend the system.
                </li>
              </ul>
            </section>
          </TabsContent>

          {/* USER TYPES / ACCESS */}
          <TabsContent value="roles">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">User types & access</h2>
              <p>
                MolVE distinguishes two main user types with different access
                levels. Permissions are enforced by the backend using sessions and
                role checks.
              </p>

              <h3 className="text-xl font-semibold mt-2">Admin</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Can log into the admin dashboard.</li>
                <li>Can create and manage users (admins and evaluators).</li>
                <li>Can upload and manage molecule datasets (SDF upload only).</li>
                <li>Can configure evaluation settings (evaluation mode, guest viewing).</li>
                <li>Can inspect and delete evaluations and molecules.</li>
                <li>Can download molecules and evaluations datasets via the API.</li>
                <li>Has access to additional settings endpoints under <code>/api/admin/...</code>.</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Evaluator ("user")</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Can log into the evaluation interface and access the
                  {" "}
                  <code>/user-evaluation</code> page.
                </li>
                <li>
                  Can request random molecules to evaluate based on the current
                  evaluation mode.
                </li>
                <li>
                  Can submit evaluations (rating, notes, and issue flags) but
                  cannot modify global datasets or users.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Guest</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Can optionally access a read‑only guest viewer page
                  {" "}
                  (<code>/guest-viewer</code>) when enabled by the admin.
                </li>
                <li>Does not require login and cannot submit evaluations.</li>
                <li>Useful for demos or teaching scenarios.</li>
              </ul>

              <p className="mt-2">
                Access to each API route is restricted by these roles (see the
                {" "}
                <strong>API & routes</strong> tab for a detailed list).
              </p>
            </section>
          </TabsContent>

          {/* API & ROUTES */}
          <TabsContent value="api">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">API & routes</h2>
              <p>
                The backend exposes a JSON HTTP API under paths like
                {" "}
                <code>/api/...</code>. The React frontend calls these endpoints via
                the <code>apiRequest</code> helper, and admins can also use API
                tokens for programmatic access.
              </p>
              <p>
                Authentication is session‑based for browser users (via cookies)
                and token‑based for API access. For tokens, send a
                {" "}
                <code>Bearer &lt;token&gt;</code> in the <code>Authorization</code>
                {" "}
                header. Errors use appropriate HTTP status codes with small JSON
                messages.
              </p>

              <h3 className="text-xl font-semibold">Authentication</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>POST /api/login</code> – login with username/password,
                  creates a session cookie. <strong>Any user</strong>.
                </li>
                <li>
                  <code>POST /api/logout</code> – destroy current session.
                  {" "}
                  <strong>Logged‑in users</strong>.
                </li>
                <li>
                  <code>GET /api/auth/user</code> – return current user id,
                  username, and role. <strong>Logged‑in users</strong>.
                </li>
                <li>
                  <code>POST /api/auth/change-password</code> – change password
                  for the current admin user. <strong>Admin only</strong>.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">API tokens (per user)</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>GET /api/api-tokens</code> – list tokens for the logged‑in
                  user.
                </li>
                <li>
                  <code>POST /api/api-tokens</code> – create a new API token.
                </li>
                <li>
                  <code>DELETE /api/api-tokens/:id</code> – revoke a token (owner
                  or admin only).
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Admin: molecules</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>GET /api/admin/molecules</code> – list all stored
                  molecules.
                </li>
                <li>
                  <code>GET /api/admin/molecules/stats</code> – molecules with
                  evaluation counts.
                </li>
                <li>
                  <code>POST /api/admin/molecules/upload-sdf</code> – upload an
                  SDF file (multipart field <code>sdf</code>); molecules are
                  processed with the Python/RDKit service.
                </li>
                <li>
                  <code>DELETE /api/admin/molecules/:id</code> – delete one
                  molecule.
                </li>
                <li>
                  <code>DELETE /api/admin/molecules</code> – delete all
                  molecules.
                </li>
                <li>
                  <code>GET /api/admin/molecules/download</code> – download
                  molecules as CSV (used by the admin dashboard download button).
                </li>
                <li>
                  <code>GET /api/admin/molecules/download-sdf</code> – download
                  molecules as SDF.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Admin: evaluations & settings</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>GET /api/admin/evaluations</code> – list evaluations with
                  molecule context.
                </li>
                <li>
                  <code>DELETE /api/admin/evaluations/:id</code> – delete a
                  single evaluation.
                </li>
                <li>
                  <code>GET /api/admin/download/evaluations</code> – download
                  evaluations as CSV (used by the admin dashboard download
                  button).
                </li>
                <li>
                  <code>GET /api/admin/evaluation-mode</code> – get current
                  evaluation mode (<code>all</code>,
                  {" "}
                  <code>unevaluated</code>, or
                  {" "}
                  <code>unevaluated_by_label</code>).
                </li>
                <li>
                  <code>POST /api/admin/evaluation-mode</code> – update
                  evaluation mode. Body:
                  {" "}
                  <code>
                    {'{ "mode": "all" | "unevaluated" | "unevaluated_by_label" }'}
                  </code>
                  .
                </li>
                <li>
                  <code>GET /api/admin/settings</code> – get admin‑configurable
                  settings such as <code>allowGuestViewing</code>.
                </li>
                <li>
                  <code>POST /api/admin/settings</code> – update admin settings.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Admin: users</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>GET /api/admin/users</code> – list all users (admin and
                  user).
                </li>
                <li>
                  <code>POST /api/admin/users</code> – create a new user.
                </li>
                <li>
                  <code>PUT /api/admin/users/:id</code> – update username,
                  password, or role for a user.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Evaluator endpoints</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>GET /api/molecules/random</code> – fetch a random
                  molecule according to the current evaluation mode (all vs
                  unevaluated for that user).
                </li>
                <li>
                  <code>POST /api/evaluations</code> – submit an evaluation for a
                  molecule (rating, notes, structural issue flags).
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Programmatic API (versioned)</h3>
              <p className="text-sm text-gray-700">
                These endpoints are intended for programmatic access using API tokens
                (see <code>tests_tools_to_use/test_python_api.py</code> for examples
                using <code>requests</code>). All of them require an
                <code>Authorization: Bearer &lt;token&gt;</code> header; some are
                restricted to tokens owned by admin users.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <code>POST /api/v1/molecules</code> – create or fetch a molecule
                  by SMILES. Requires an <strong>admin‑owned</strong> token. Body
                  includes SMILES, basic properties (molecular weight, logP,
                  HBD/HBA, SAS), optional SDF, and the NPS fields
                  (<code>nps</code>, <code>npsConfidence</code>).
                </li>
                <li>
                  <code>POST /api/v1/molecules/upload-sdf</code> – bulk‑import
                  molecules from an SDF file (<code>multipart/form-data</code>
                  field <code>sdf</code>). Requires an admin‑owned token.
                </li>
                <li>
                  <code>GET /api/v1/molecules/download-sdf</code> – download the
                  stored molecules as an SDF dataset. Any valid token.
                </li>
                <li>
                  <code>GET /api/v1/molecules/download-csv</code> – download the
                  stored molecules as CSV. Any valid token.
                </li>
                <li>
                  <code>GET /api/v1/evaluations/download-csv</code> – download the
                  evaluations dataset as CSV. Admin‑owned tokens only.
                </li>
                <li>
                  <code>POST /api/v1/smiles-to-sdf</code> – proxy to the Python
                  service to generate a 3D SDF from a SMILES string.
                </li>
                <li>
                  <code>POST /api/v1/sdf-properties</code> – proxy to the Python
                  service to compute molecular properties from an SDF block.
                </li>
                <li>
                  <code>POST /api/v1/predict</code> – proxy to the Python
                  <code>/rf-predict</code> endpoint to obtain a random‑forest
                  priority score for a SMILES.
                </li>
                <li>
                  <code>POST /api/predict</code> – stable alias that forwards to
                  <code>/api/v1/predict</code>; useful if the versioned path
                  changes in the future.
                </li>
              </ul>

              <p className="mt-4">
                The authoritative source of truth for available routes is
                {" "}
                <code>server/routes.ts</code>. If you modify or extend the API,
                update this guide together with that file.
              </p>
            </section>
          </TabsContent>

          {/* ADMIN GUIDE */}
          <TabsContent value="admin-workflow">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Admin guide</h2>
              <p>
                This section explains how an admin uses the interface to
                configure the evaluation behaviour, manage users, and make
                molecules available.
              </p>

              <h3 className="text-xl font-semibold mt-2">1. Log in as admin</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the MolVE web application in your browser.</li>
                <li>Go to the <code>/login</code> page.</li>
                <li>Enter your admin credentials (username and password).</li>
                <li>
                  Click <strong>Log in</strong>. You will be redirected to the
                  main dashboard or admin dashboard.
                </li>
              </ol>

              <h3 className="text-xl font-semibold mt-4">2. Explore the admin dashboard</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  After logging in as an admin, open the
                  {" "}
                  <code>/admin-dashboard</code> page from the navigation bar.
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

              <h3 className="text-xl font-semibold mt-4">3. Create or manage users</h3>
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
                      <strong>Role</strong> – choose <code>user</code> for
                      evaluators or <code>admin</code> for administrators.
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

              <h3 className="text-xl font-semibold mt-4">4. Upload molecules from SDF</h3>
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
                  <code>/api/admin/molecules/upload-sdf</code>, which parses the
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
                      <code>;</code>
                      (e.g. <code>"SetA;SetB"</code>), so you can track that the
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

              <h3 className="text-xl font-semibold mt-4">5. Configure evaluation behaviour</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  In the <strong>Settings</strong> tab, choose the evaluation
                  mode (<code>all</code> molecules vs only
                  {" "}
                  <code>unevaluated</code> molecules for each user). This
                  controls how <code>/api/molecules/random</code> behaves.
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

              <h3 className="text-xl font-semibold mt-4">6. Monitor and export results</h3>
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
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Evaluator guide</h2>
              <p>
                This section explains how an evaluator uses MolVE to inspect
                molecules and submit evaluations from the
                {" "}
                <code>/user-evaluation</code> page.
              </p>

              <h3 className="text-xl font-semibold mt-2">1. Log in</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>Open the MolVE web application in your browser.</li>
                <li>Navigate to the <code>/login</code> page.</li>
                <li>Enter the username and password provided by your admin.</li>
                <li>
                  After successful login, go to the
                  {" "}
                  <code>/user-evaluation</code> page from the navigation
                  header.
                </li>
              </ol>

              <h3 className="text-xl font-semibold mt-4">2. Get a molecule to evaluate</h3>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  When the page loads, it automatically requests a random
                  molecule from <code>/api/molecules/random</code>.
                </li>
                <li>
                  Use the "Next molecule" action to fetch new molecules, obeying
                  the evaluation mode configured by the admin.
                </li>
              </ol>

              <h3 className="text-xl font-semibold mt-4">3. Use the molecular viewers</h3>
              <p>The evaluation screen typically shows:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  A <strong>2D viewer</strong> based on ChemDoodle, embedded via
                  <code>react-chemdoodle</code>.
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

              <h3 className="text-xl font-semibold mt-4">4. Fill in the evaluation form</h3>
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
                  <code>/api/evaluations</code> and then automatically loads the
                  next molecule.
                </li>
              </ol>

              <h3 className="text-xl font-semibold mt-4">5. Troubleshooting</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  If you are logged out or your session expires, you will see an
                  unauthorized error and be redirected to <code>/login</code>.
                </li>
                <li>
                  If no SDF data is available for a molecule, the 3D view may
                  not render; report this to the admin so the dataset can be
                  fixed.
                </li>
              </ul>
            </section>
          </TabsContent>

          <TabsContent value="features">
            <section className="space-y-4">
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

          <TabsContent value="architecture">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Architecture, project structure & deployment</h2>
              <p>
                MolVE is organised as a small monorepo with three main services running in Docker:
                a TypeScript web app (React + Express), a PostgreSQL database, and a Python/RDKit
                microservice. Development and production setups are defined in
                {" "}
                <code>docker-compose.yaml</code>
                {" "}
                and
                {" "}
                <code>docker-compose.prod.yaml</code>
                .
              </p>
              <h3 className="text-xl font-semibold">Repository layout</h3>
              <p>The main folders you will interact with are:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>services/app/client/src/</strong> – React frontend,
                  including pages (e.g. <code>login</code>,
                  {" "}
                  <code>dashboard</code>, <code>user-evaluation</code>,
                  <code>admin-dashboard</code>, <code>guest-viewer</code>,
                  <code>user-api-tokens</code>, <code>guide</code>), shared UI
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
                      <code>auth.ts</code> – session setup, login/logout,
                      current user, and admin password change.
                    </li>
                    <li>
                      <code>routes.ts</code> – main HTTP routes for molecules,
                      evaluations, users, settings, and API tokens.
                    </li>
                    <li>
                      <code>db.ts</code> – database access via Drizzle ORM.
                    </li>
                    <li>
                      <code>services/molecular.ts</code> – integration with the
                      Python service for SDF processing.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>services/app/shared/</strong> – shared TypeScript schemas and types
                  used by both frontend and backend (imported as
                  {" "}
                  <code>@shared/schema</code>).
                </li>
                <li>
                  <strong>services/python-service/</strong> – FastAPI‑based
                  RDKit service with routes for health checks, SMILES→SDF, SDF
                  property extraction, and random‑forest predictions.
                </li>
                <li>
                  <strong>services/db/</strong> – Postgres volume
                  configuration and init SQL (mounted inside the DB container
                  as <code>/var/lib/postgresql/data</code> and
                  {" "}
                  <code>/docker-entrypoint-initdb.d</code>).
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
              <h3 className="text-xl font-semibold mt-4">Technology stack</h3>
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
                  migrations (see <code>drizzle.config.ts</code>).
                </li>
                <li>
                  <strong>Authentication</strong> – Express sessions stored in
                  PostgreSQL via <code>connect-pg-simple</code>.
                </li>
                <li>
                  <strong>Molecular tooling</strong> – ChemDoodle and JSmol on
                  the frontend, RDKit via the Python microservice.
                </li>
              </ul>

              <h3 className="text-xl font-semibold mt-4">Containers and interactions</h3>
              <p>
                Both development and production deployments are defined via
                Docker Compose:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                <li>
                  <code>docker-compose.yaml</code> – development setup. Binds
                  source folders into the <code>app</code> container, exposes
                  the Node dev server on <code>5000</code>, the Node inspector
                  on <code>9229</code>, the Python service on
                  {" "}
                  <code>8000</code>, and Postgres on
                  {" "}
                  <code>5432</code>. Hot‑reload is available via Vite.
                </li>
                <li>
                  <code>docker-compose.prod.yaml</code> – production setup.
                  Builds the same images but runs the Node app with
                  <code>npm run start</code> and does not bind‑mount source or
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
                      Exposes HTTP endpoints under <code>/api/...</code> and
                      serves the React SPA.
                    </li>
                    <li>
                      Connects to PostgreSQL using <code>DATABASE_URL</code> and
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
                      Uses a Docker volume from <code>docker_storages/</code> for
                      persistent storage (see <code>services/db/docker_storages/postgres</code>).
                    </li>
                    <li>
                      Is initialised with SQL scripts from
                      {" "}
                      <code>services/db/init/init-db.sql</code> (and, for
                      experiments, CSVs in the <code>initial_configs</code>
                      folders).
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>Python service container</strong> (FastAPI + RDKit):
                  <ul className="list-disc list-inside ml-6 mt-1 space-y-1">
                    <li>
                      Built from <code>services/python-service/Dockerfile</code>
                      with dependencies from
                      {" "}
                      <code>services/python-service/requirements.txt</code>.
                    </li>
                    <li>
                      Exposes routes from
                      {" "}
                      <code>services/python-service/routes/</code> such
                      as <code>/health</code>, <code>/smiles-to-sdf</code>,
                      <code>/sdf-properties</code>, and
                      {" "}
                      <code>/rf-predict</code>.
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
                  (pages under <code>client/src/pages</code>).
                </li>
                <li>
                  The frontend calls the Express backend (<code>server/</code>)
                  for login, molecules, evaluations, users, and settings.
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