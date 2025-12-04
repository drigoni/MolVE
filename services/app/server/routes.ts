import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin, isUser, authenticateApiToken, requireAdminApiToken } from "./auth";
import { processSdfMolecule } from "./services/molecular";
import fetch from "node-fetch";
import { insertMoleculeSchema, insertEvaluationSchema } from "@shared/schema";
import multer from "multer";
// Removed CSV parsing - only SDF supported
import bcrypt from "bcrypt";
// db is used only in storage; routes should rely on storage abstraction

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Configure multer for file uploads
  const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.originalname.endsWith(".sdf")) {
        cb(null, true);
      } else {
        cb(new Error("Only SDF files are allowed"), false);
      }
    },
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  });

  // --- API token management for logged-in users ---

  // List current user's API tokens
  app.get("/api/api-tokens", isAuthenticated, async (req, res) => {
    try {
      const tokens = await storage.getUserApiTokens(req.session.userId!);
      res.json(tokens);
    } catch (error) {
      console.error("Error fetching API tokens:", error);
      res.status(500).json({ message: "Failed to fetch API tokens" });
    }
  });

  // Create a new API token for current user
  app.post("/api/api-tokens", isAuthenticated, async (req, res) => {
    try {
      const token = await storage.createApiToken(req.session.userId!);
      res.json(token);
    } catch (error) {
      console.error("Error creating API token:", error);
      res.status(500).json({ message: "Failed to create API token" });
    }
  });

  // Revoke an API token (must belong to current user or admin)
  app.delete("/api/api-tokens/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const token = await storage.getApiToken(id);
      if (!token) {
        return res.status(404).json({ message: "Token not found" });
      }

      if (req.session.role !== "admin" && token.userId !== req.session.userId) {
        return res.status(403).json({ message: "Not allowed to revoke this token" });
      }

      await storage.deleteApiToken(id);
      res.json({ message: "Token revoked" });
    } catch (error) {
      console.error("Error revoking API token:", error);
      res.status(500).json({ message: "Failed to revoke API token" });
    }
  });

  app.get(
    "/api/admin/molecules",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const page = parseInt((req.query.page as string) ?? "1");
        const limit = parseInt((req.query.limit as string) ?? "50");
        const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
        const safeLimit = Number.isNaN(limit) || limit < 1 ? 50 : Math.min(limit, 200);
        const offset = (safePage - 1) * safeLimit;

        const [items, total] = await Promise.all([
          storage.getAllMolecules(safeLimit, offset),
          storage.getDashboardStats().then((s) => s.totalMolecules),
        ]);

        res.json({
          items,
          total,
          page: safePage,
          pageSize: safeLimit,
          totalPages: Math.max(1, Math.ceil(total / safeLimit)),
        });
      } catch (error) {
        console.error("Error fetching molecules:", error);
        res.status(500).json({ message: "Failed to fetch molecules" });
      }
    },
  );

  // Download molecules dataset as CSV
  app.get(
    "/api/admin/molecules/download",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const molecules = await storage.getAllMolecules();

        // Create CSV header (including NPS fields)
        const csvHeader =
          "ID,SMILES,Molecular Weight,LogP,HBD,HBA,SAS,NPS,NPS Confidence,Created At\n";

        // Create CSV rows
        const csvRows = molecules
          .map((mol: any) => {
            const createdAt = mol.createdAt
              ? new Date(mol.createdAt).toISOString()
              : "";
            return `${mol.id},"${mol.smiles}",${mol.molecularWeight},${mol.logP},${mol.hbd},${mol.hba},${mol.sas},${mol.nps ?? ""},${mol.npsConfidence ?? ""},"${createdAt}"`;
          })
          .join("\n");

        const csvContent = csvHeader + csvRows;

        // Set headers for file download
        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="molecules_dataset_${new Date().toISOString().split("T")[0]}.csv"`,
        );
        res.send(csvContent);
      } catch (error) {
        console.error("Error downloading molecules:", error);
        res
          .status(500)
          .json({ message: "Failed to download molecules dataset" });
      }
    },
  );

  // Download molecules dataset as SDF
  app.get(
    "/api/admin/molecules/download-sdf",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const molecules = await storage.getAllMolecules();

        if (!molecules || molecules.length === 0) {
          return res.status(404).json({ message: "No molecules available" });
        }

        // Concatenate stored SDF blocks; each entry already represents a full
        // SDF record for a single molecule as returned by processSdfMolecule.
        const sdfContent = molecules
          .map((mol) => mol.sdf || "")
          .filter((block) => block.trim().length > 0)
          .join("\n");

        if (!sdfContent.trim()) {
          return res
            .status(500)
            .json({ message: "Molecules do not have SDF content stored" });
        }

        res.setHeader("Content-Type", "chemical/x-mdl-sdfile");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="molecules_${new Date().toISOString().split("T")[0]}.sdf"`,
        );
        res.send(sdfContent);
      } catch (error) {
        console.error("Error downloading SDF dataset:", error);
        res
          .status(500)
          .json({ message: "Failed to download SDF molecules dataset" });
      }
    },
  );

  app.get(
    "/api/admin/evaluations",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const page = parseInt((req.query.page as string) ?? "1");
        const limit = parseInt((req.query.limit as string) ?? "50");
        const safePage = Number.isNaN(page) || page < 1 ? 1 : page;
        const safeLimit = Number.isNaN(limit) || limit < 1 ? 50 : Math.min(limit, 200);
        const offset = (safePage - 1) * safeLimit;

        const [items, total] = await Promise.all([
          storage.getAllEvaluations(safeLimit, offset),
          storage.getDashboardStats().then((s) => s.total),
        ]);

        res.json({
          items,
          total,
          page: safePage,
          pageSize: safeLimit,
          totalPages: Math.max(1, Math.ceil(total / safeLimit)),
        });
      } catch (error) {
        console.error("Error fetching evaluations:", error);
        res.status(500).json({ message: "Failed to fetch evaluations" });
      }
    },
  );

  app.delete(
    "/api/admin/evaluations/:id",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        await storage.deleteEvaluation(id);
        res.json({ message: "Evaluation deleted successfully" });
      } catch (error) {
        console.error("Error deleting evaluation:", error);
        res.status(500).json({ message: "Failed to delete evaluation" });
      }
    },
  );

  // SDF upload endpoint for molecules
  app.post(
    "/api/admin/molecules/upload-sdf",
    isAuthenticated,
    isAdmin,
    upload.single("sdf"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "No SDF file uploaded" });
        }

        const sdfContent = req.file.buffer.toString();

        // Split SDF content into individual molecule blocks
        const molBlocks = sdfContent
          .split("$$$$")
          .filter((block) => block.trim());

        let processed = 0;
        let skipped = 0;
        const moleculesData = [];

        for (const molBlock of molBlocks) {
          if (!molBlock.trim()) continue;
          const cleanBlock =
            molBlock.trim() +
            (molBlock.trim().endsWith("$$$$") ? "" : "\n$$$$");

          try {
            // Process each SDF molecule block
            const structure = await processSdfMolecule(cleanBlock);

            // Require NPS properties to be present; skip molecules without them
            if (
              structure.properties.nps === undefined ||
              structure.properties.npsConfidence === undefined
            ) {
              console.error(
                "Skipping molecule without required NPS properties",
                {
                  smiles: structure.smiles,
                  properties: structure.properties,
                },
              );
              skipped++;
              continue;
            }

            // Check if molecule already exists
            const existing = await storage.getMoleculeBySmiles(
              structure.smiles,
            );
            if (existing) {
              skipped++;
              continue;
            }
            const moleculeData = insertMoleculeSchema.parse({
              smiles: structure.smiles,
              molecularWeight: structure.properties.molecularWeight.toString(),
              logP: structure.properties.logP.toString(),
              hbd: structure.properties.hbd,
              hba: structure.properties.hba,
              sas: structure.properties.sas.toString(),
              nps: structure.properties.nps.toString(),
              npsConfidence: structure.properties.npsConfidence.toString(),
              sdf: structure.sdf,
            });

            moleculesData.push(moleculeData);
            processed++;
          } catch (error) {
            console.error(`Error processing SDF molecule:`, error);
            skipped++;
          }
        }

        // Batch insert molecules
        if (moleculesData.length > 0) {
          await storage.createMolecules(moleculesData);
        }

        res.json({
          message: `Successfully processed ${processed} molecules from SDF, skipped ${skipped}`,
          processed,
          skipped,
        });
      } catch (error) {
        console.error("Error uploading SDF:", error);
        res.status(500).json({ message: "Failed to upload SDF file" });
      }
    },
  );

  // Delete molecule endpoint
  app.delete(
    "/api/admin/molecules/:id",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        await storage.deleteMolecule(id);
        res.json({ message: "Molecule deleted successfully" });
      } catch (error) {
        console.error("Error deleting molecule:", error);
        res.status(500).json({ message: "Failed to delete molecule" });
      }
    },
  );

  // Delete all molecules endpoint
  app.delete(
    "/api/admin/molecules",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        await storage.deleteAllMolecules();
        res.json({ message: "All molecules deleted successfully" });
      } catch (error) {
        console.error("Error deleting all molecules:", error);
        res.status(500).json({ message: "Failed to delete all molecules" });
      }
    },
  );

  // Get molecules with evaluation counts
  app.get(
    "/api/admin/molecules/stats",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const molecules = await storage.getMoleculesWithEvaluationCounts();
        res.json(molecules);
      } catch (error) {
        console.error("Error fetching molecule stats:", error);
        res
          .status(500)
          .json({ message: "Failed to fetch molecule statistics" });
      }
    },
  );

  // User management endpoints
  app.get("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const users = await storage.getAllUsers();
      // Remove password from response
      const safeUsers = users.map(({ password, ...user }) => user);
      res.json(safeUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/admin/users", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const { username, password, role } = req.body;

      if (!username || !password) {
        return res
          .status(400)
          .json({ message: "Username and password are required" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await storage.createUser({
        username,
        password: hashedPassword,
        role: role || "user",
      });

      const { password: _, ...safeUser } = user;
      res.json(safeUser);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Failed to create user" });
    }
  });

  app.put(
    "/api/admin/users/:id",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);
        const { username, password, role } = req.body;

        const updateData: any = {};
        if (username) updateData.username = username;
        if (role) updateData.role = role;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const user = await storage.updateUser(id, updateData);
        const { password: _, ...safeUser } = user;
        res.json(safeUser);
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Failed to update user" });
      }
    },
  );

  app.delete(
    "/api/admin/users/:id",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const id = parseInt(req.params.id);

        // Prevent admin from deleting themselves
        if (req.session.userId === id) {
          return res
            .status(400)
            .json({ message: "Cannot delete your own account" });
        }

        // Get the user to be deleted
        const userToDelete = await storage.getUser(id);
        if (!userToDelete) {
          return res.status(404).json({ message: "User not found" });
        }

        // If trying to delete an admin, check if it's the last admin
        if (userToDelete.role === "admin") {
          const allUsers = await storage.getAllUsers();
          const adminCount = allUsers.filter(user => user.role === "admin").length;
          
          if (adminCount <= 1) {
            return res
              .status(400)
              .json({ message: "Cannot delete the last admin user" });
          }
        }

        await storage.deleteUser(id);
        res.json({ message: "User deleted successfully" });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: "Failed to delete user" });
      }
    },
  );

  // Download evaluation dataset
  app.get(
    "/api/admin/download/evaluations",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const dataset = await storage.getEvaluationDataset();

        // CSV header: keep it aligned with the values below
        const csvHeader =
          "Molecule ID,SMILES,Molecular Weight,LogP,HBD,HBA,SAS,NPS,NPS Confidence,Evaluation,Notes,Issue Solubility,Issue Synthetic Accessibility,Issue Dimension,Issue Permeability,Username,Date\n";

        const csvData = dataset
          .map((row) => {
            const date =
              row.evaluationDate instanceof Date
                ? row.evaluationDate.toISOString()
                : row.evaluationDate ?? "";

            const esc = (v: unknown) => String(v ?? "").replace(/"/g, '""');

            const values = [
              esc(row.moleculeId),
              esc(row.smiles),
              esc(row.molecularWeight),
              esc(row.logP),
              esc(row.hbd ?? ""),
              esc(row.hba ?? ""),
              esc(row.sas ?? ""),
              esc(row.nps ?? ""),
              esc(row.npsConfidence ?? ""),
              esc(row.evaluation),
              esc(row.notes || ""),
              row.issueSolubility ? "1" : "0",
              row.issueSyntheticAccessibility ? "1" : "0",
              row.issueDimension ? "1" : "0",
              row.issuePermeability ? "1" : "0",
              esc(row.username),
              esc(date),
            ];

            return values.map((v) => `"${v}"`).join(",");
          })
          .join("\n");

        const timestamp = new Date().toISOString().replace(/:/g, "-");
        const filename = `Molve_evaluations_${timestamp}.csv`;

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}"`,
        );
        res.send(csvHeader + csvData);
      } catch (error) {
        console.error("Error downloading evaluations:", error);
        res.status(500).json({ message: "Failed to download evaluations" });
      }
    },
  );

  // Settings routes (admin only)
  app.get("/api/admin/settings", isAuthenticated, isAdmin, async (req, res) => {
    try {
      const allowGuestViewing = await storage.getAllowGuestViewing();
      res.json({ allowGuestViewing });
    } catch (error) {
      console.error("Error fetching settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  app.post(
    "/api/admin/settings",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const { allowGuestViewing } = req.body;

        if (typeof allowGuestViewing !== "boolean") {
          return res
            .status(400)
            .json({ message: "allowGuestViewing must be a boolean" });
        }

        await storage.setSetting({
          key: "allow_guest_viewing",
          value: allowGuestViewing,
          description:
            "Allow guests to view molecular structures without logging in",
        });

        res.json({
          message: "Settings updated successfully",
          allowGuestViewing,
        });
      } catch (error) {
        console.error("Error updating settings:", error);
        res.status(500).json({ message: "Failed to update settings" });
      }
    },
  );

  // Public route to check if guest viewing is allowed
  app.get("/api/public/settings", async (req, res) => {
    try {
      const allowGuestViewing = await storage.getAllowGuestViewing();
      res.json({ allowGuestViewing });
    } catch (error) {
      console.error("Error fetching public settings:", error);
      res.status(500).json({ message: "Failed to fetch settings" });
    }
  });

  // Public route to get random molecule (when guest viewing is enabled)
  app.get("/api/public/molecules/random", async (req, res) => {
    try {
      const allowGuestViewing = await storage.getAllowGuestViewing();

      if (!allowGuestViewing) {
        return res.status(401).json({ message: "Guest viewing is disabled" });
      }

      const molecule = await storage.getRandomMolecule("all");

      if (!molecule) {
        return res.status(404).json({ message: "No molecules available" });
      }

      res.json(molecule);
    } catch (error) {
      console.error("Error fetching random molecule:", error);
      res.status(500).json({ message: "Failed to fetch molecule" });
    }
  });


  // User routes for molecule evaluation
  app.get(
    "/api/molecules/random",
    isAuthenticated,
    isUser,
    async (req, res) => {
      try {
        // Get the evaluation mode from database settings
        const setting = await storage.getSetting("evaluation_mode");
        const evaluationMode = setting?.value === "unevaluated" ? "unevaluated" : "all";
        const molecule = await storage.getRandomMolecule(evaluationMode);

        if (!molecule) {
          return res
            .status(404)
            .json({ message: "No molecules available for evaluation" });
        }

        res.json(molecule);
      } catch (error) {
        console.error("Error fetching random molecule:", error);
        res.status(500).json({ message: "Failed to fetch molecule" });
      }
    },
  );

  // Get evaluation mode setting
  app.get(
    "/api/admin/evaluation-mode",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const setting = await storage.getSetting("evaluation_mode");
        const mode = setting?.value === "unevaluated" ? "unevaluated" : "all";
        res.json({ mode });
      } catch (error) {
        res.status(500).json({ message: "Failed to get evaluation mode" });
      }
    },
  );

  // Set evaluation mode
  app.post(
    "/api/admin/evaluation-mode",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const { mode } = req.body;
        if (mode !== "all" && mode !== "unevaluated") {
          return res.status(400).json({ message: "Invalid mode" });
        }

        await storage.setSetting({
          key: "evaluation_mode",
          value: mode,
          description: "Controls which molecules users can evaluate: all or only unevaluated"
        });

        res.json({ mode });
      } catch (error) {
        res.status(500).json({ message: "Failed to set evaluation mode" });
      }
    },
  );

  app.get("/api/molecules/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const molecule = await storage.getMolecule(id);

      if (!molecule) {
        return res.status(404).json({ message: "Molecule not found" });
      }

      res.json(molecule);
    } catch (error) {
      console.error("Error fetching molecule:", error);
      res.status(500).json({ message: "Failed to fetch molecule" });
    }
  });

  // Evaluation routes (users can only submit evaluations)
  app.post(
    "/api/evaluations",
    isAuthenticated,
    isUser,
    async (req: any, res) => {
      try {
        const userId = req.session.userId;
        const evaluationData = insertEvaluationSchema.parse({
          ...req.body,
          userId,
        });

        const evaluation = await storage.createEvaluation(evaluationData);
        res.json(evaluation);
      } catch (error) {
        console.error("Error creating evaluation:", error);
        res.status(500).json({ message: "Failed to create evaluation" });
      }
    },
  );

  app.get("/api/evaluations", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.session.userId;
      const limit = parseInt(req.query.limit as string) || 10;

      const evaluations = await storage.getUserEvaluations(userId, limit);
      res.json(evaluations);
    } catch (error) {
      console.error("Error fetching evaluations:", error);
      res.status(500).json({ message: "Failed to fetch evaluations" });
    }
  });


  app.get(
    "/api/dashboard/stats",
    isAuthenticated,
    isAdmin,
    async (req: any, res) => {
      try {
        const stats = await storage.getDashboardStats();
        res.json(stats);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
        res.status(500).json({ message: "Failed to fetch dashboard stats" });
      }
    },
  );















  // -----------------------------------------------------------------------------
  // --- Public API for programmatic access ---
  // -----------------------------------------------------------------------------
  // /api/v1/molecules: Add a molecule via API token (admin-owned tokens only)
  // /api/v1/molecules/upload-sdf: Bulk add molecules from SDF via API token (admin-owned tokens only)
  // /api/v1/molecules/download-sdf: Get molecules dataset as SDF (all API users)
  // /api/v1/molecules/download-csv: Get molecules dataset as CSV (all API users)
  // /api/v1/evaluations/download-csv: Get evaluations dataset as CSV (admin-owned tokens only)

  // Add a molecule via API token (admin-owned tokens only)
  app.post("/api/v1/molecules", authenticateApiToken, requireAdminApiToken, async (req, res) => {
    try {
      const { smiles, molecularWeight, logP, hbd, hba, sas, nps, npsConfidence, sdf } = req.body;
      // Enforce required fields, including NPS properties
      if (
        !smiles ||
        molecularWeight === undefined ||
        logP === undefined ||
        hbd === undefined ||
        hba === undefined ||
        sas === undefined ||
        nps === undefined ||
        npsConfidence === undefined
      ) {
        return res.status(400).json({ message: "Missing required molecule properties" });
      }

      const existing = await storage.getMoleculeBySmiles(smiles);
      if (existing) {
        return res.json(existing);
      }

      const molecule = await storage.createMolecule({
        smiles,
        molecularWeight: String(molecularWeight),
        logP: String(logP),
        hbd,
        hba,
        sas: String(sas),
        nps: String(nps),
        npsConfidence: String(npsConfidence),
        sdf: sdf ?? null,
      } as any);

      res.status(201).json(molecule);
    } catch (error) {
      console.error("Error creating molecule via API:", error);
      res.status(500).json({ message: "Failed to create molecule" });
    }
  });

  // Bulk add molecules from SDF via API token (admin-owned tokens only)
  app.post(
    "/api/v1/molecules/upload-sdf",
    authenticateApiToken,
    requireAdminApiToken,
    upload.single("sdf"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "No SDF file uploaded" });
        }

        const sdfContent = req.file.buffer.toString();

        // Split SDF content into individual molecule blocks
        const molBlocks = sdfContent
          .split("$$$$")
          .filter((block) => block.trim());

        let processed = 0;
        let skipped = 0;
        const moleculesData = [];

        for (const molBlock of molBlocks) {
          if (!molBlock.trim()) continue;
          const cleanBlock =
            molBlock.trim() +
            (molBlock.trim().endsWith("$$$$") ? "" : "\n$$$$");

          try {
            // Process each SDF molecule block
            const structure = await processSdfMolecule(cleanBlock);

            // Require NPS properties to be present; skip molecules without them
            if (
              structure.properties.nps === undefined ||
              structure.properties.npsConfidence === undefined
            ) {
              console.error(
                "Skipping molecule without required NPS properties via API",
                {
                  smiles: structure.smiles,
                  properties: structure.properties,
                },
              );
              skipped++;
              continue;
            }

            // Check if molecule already exists
            const existing = await storage.getMoleculeBySmiles(
              structure.smiles,
            );
            if (existing) {
              skipped++;
              continue;
            }

            const moleculeData = insertMoleculeSchema.parse({
              smiles: structure.smiles,
              molecularWeight: structure.properties.molecularWeight.toString(),
              logP: structure.properties.logP.toString(),
              hbd: structure.properties.hbd,
              hba: structure.properties.hba,
              sas: structure.properties.sas.toString(),
              nps: structure.properties.nps.toString(),
              npsConfidence: structure.properties.npsConfidence.toString(),
              sdf: structure.sdf,
            });

            moleculesData.push(moleculeData);
            processed++;
          } catch (error) {
            console.error(`Error processing SDF molecule via API:`, error);
            skipped++;
          }
        }

        // Batch insert molecules
        if (moleculesData.length > 0) {
          await storage.createMolecules(moleculesData);
        }

        res.json({
          message: `Successfully processed ${processed} molecules from SDF via API, skipped ${skipped}`,
          processed,
          skipped,
        });
      } catch (error) {
        console.error("Error uploading SDF via API:", error);
        res.status(500).json({ message: "Failed to upload SDF file via API" });
      }
    },
  );

  // Get molecules dataset as SDF (all API users)
  app.get("/api/v1/molecules/download-sdf", authenticateApiToken, async (req, res) => {
    try {
      const molecules = await storage.getAllMolecules();

      // Build a very simple SDF by concatenating stored SDF blocks when available.
      const sdfBlocks = molecules
        .map((mol) => mol.sdf)
        .filter((sdf) => sdf && sdf.trim().length > 0) as string[];

      if (sdfBlocks.length === 0) {
        return res.status(404).json({ message: "No SDF data available" });
      }

      const sdfContent = sdfBlocks
        .map((block) => {
          const trimmed = block.trimEnd();
          return trimmed.endsWith("$$$$") ? trimmed : trimmed + "\n$$$$";
        })
        .join("\n");

      res.setHeader("Content-Type", "chemical/x-mdl-sdfile");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="molecules_dataset_${new Date().toISOString().split("T")[0]}.sdf"`,
      );
      res.send(sdfContent);
    } catch (error) {
      console.error("Error downloading molecules SDF via API:", error);
      res.status(500).json({ message: "Failed to download molecules SDF dataset" });
    }
  });

  // Get molecules dataset as CSV (all API users)
  app.get("/api/v1/molecules/download-csv", authenticateApiToken, async (req, res) => {
    try {
      const molecules = await storage.getAllMolecules();

      const csvHeader =
        "ID,SMILES,Molecular Weight,LogP,HBD,HBA,SAS,NPS,NPS Confidence,Created At\n";

      const csvRows = molecules
        .map((mol) => {
          const createdAt = mol.createdAt
            ? new Date(mol.createdAt).toISOString()
            : "";
          return `${mol.id},"${mol.smiles}",${mol.molecularWeight},${mol.logP},${mol.hbd},${mol.hba},${mol.sas},${mol.nps ?? ""},${mol.npsConfidence ?? ""},"${createdAt}"`;
        })
        .join("\n");

      const csvContent = csvHeader + csvRows;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="molecules_dataset_${new Date().toISOString().split("T")[0]}.csv"`,
      );
      res.send(csvContent);
    } catch (error) {
      console.error("Error downloading molecules CSV via API:", error);
      res.status(500).json({ message: "Failed to download molecules CSV dataset" });
    }
  });

  // Get evaluations dataset as CSV (admin API tokens only)
  app.get("/api/v1/evaluations/download-csv", authenticateApiToken, requireAdminApiToken, async (req, res) => {
    try {
      const dataset = await storage.getEvaluationDataset();
      // CSV header: keep it aligned with the values below (15 columns)
      const csvHeader =
        "Molecule ID,SMILES,Molecular Weight,LogP,HBD,HBA,SAS,NPS,NPS Confidence,Evaluation,Notes,Issue Solubility,Issue Synthetic Accessibility,Issue Dimension,Issue Permeability,Username,Date\n";

      const csvData = dataset
        .map((row) => {
          const date =
            row.evaluationDate instanceof Date
              ? row.evaluationDate.toISOString()
              : row.evaluationDate ?? "";

          const esc = (v: unknown) => String(v ?? "").replace(/"/g, '""');

          const values = [
            esc(row.moleculeId),
            esc(row.smiles),
            esc(row.molecularWeight),
            esc(row.logP),
            esc(row.hbd ?? ""),
            esc(row.hba ?? ""),
            esc(row.sas ?? ""),
            esc(row.nps ?? ""),
            esc(row.npsConfidence ?? ""),
            esc(row.evaluation),
            esc(row.notes || ""),
            row.issueSolubility ? "1" : "0",
            row.issueSyntheticAccessibility ? "1" : "0",
            row.issueDimension ? "1" : "0",
            row.issuePermeability ? "1" : "0",
            esc(row.username),
            esc(date),
          ];

          return values.map((v) => `"${v}"`).join(",");
        })
        .join("\n");

      const timestamp = new Date().toISOString().replace(/:/g, "-");
      const filename = `Molve_evaluations_${timestamp}.csv`;

      res.setHeader("Content-Type", "text/csv");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${filename}"`,
      );
      res.send(csvHeader + csvData);
    } catch (error) {
      console.error("Error downloading evaluations CSV via API:", error);
      res.status(500).json({ message: "Failed to download evaluations CSV" });
    }
  });










  // -----------------------------------------------------------------------------
  // --- Python service integration: SMILES -> 3D SDF ---
  // -----------------------------------------------------------------------------
  // /api/v1/smiles-to-sdf: It accepts a SMILES string, calls the Python /sdf API, and returns the generated SDF block (with 3D coordinates) to the client.
  // /api/v1/sdf-properties: It accepts an SDF block, forwards it to the python_service /sdf-properties route, and returns the computed properties.


  // This endpoint is a thin proxy around the python_service FastAPI app.
  // It accepts a SMILES string, calls the Python /sdf API, and returns
  // the generated SDF block (with 3D coordinates) to the client.
  app.post("/api/v1/smiles-to-sdf", authenticateApiToken, requireAdminApiToken, async (req, res) => {
    try {
      const { smiles } = req.body ?? {};
      if (!smiles || typeof smiles !== "string") {
        return res.status(400).json({ message: "smiles is required" });
      }

      // The python-service container is on the same Docker network.
      // FastAPI runs on port 8000 as configured in python_service/Dockerfile.
      const pythonUrl = "http://python-service:8000/smiles-to-sdf";

      const response = await fetch(pythonUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ smiles }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = (data as any)?.detail || (data as any)?.message || "Python service error";
        return res.status(response.status).json({ message });
      }

      // Expecting shape: { smiles: string, sdf: string }
      return res.json(data);
    } catch (error) {
      console.error("Error calling python-service /smiles-to-sdf:", error);
      return res.status(500).json({ message: "Failed to generate SDF via Python service" });
    }
  });

  // This endpoint accepts an SDF block, forwards it to the python_service
  // /sdf-properties route, and returns the computed properties.
  app.post("/api/v1/sdf-properties", authenticateApiToken, requireAdminApiToken, async (req, res) => {
    try {
      const { sdf } = req.body ?? {};
      if (!sdf || typeof sdf !== "string") {
        return res.status(400).json({ message: "sdf is required" });
      }

      const pythonUrl = "http://python-service:8000/sdf-properties";

      const response = await fetch(pythonUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sdf }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = (data as any)?.detail || (data as any)?.message || "Python service error";
        return res.status(response.status).json({ message });
      }

      // Expecting shape: { molecularWeight, logP, hbd, hba, sas }
      return res.json(data);
    } catch (error) {
      console.error("Error calling python-service /sdf-properties:", error);
      return res.status(500).json({ message: "Failed to compute properties via Python service" });
    }
  });

  // This endpoint accepts a smiles, forwards it to the python_service
  app.post("/api/v1/predict", authenticateApiToken, requireAdminApiToken, async (req, res) => {
    try {
      const { smiles } = req.body ?? {};
      if (!smiles || typeof smiles !== "string") {
        return res.status(400).json({ message: "smiles is required" });
      }

      const pythonUrl = "http://python-service:8000/rf-predict";

      const response = await fetch(pythonUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ smiles }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message = (data as any)?.detail || (data as any)?.message || "Python service error";
        return res.status(response.status).json({ message });
      }

      // Expecting shape: { smiles: string, sdf: string }
      return res.json(data);
    } catch (error) {
      console.error("Error calling python-service /rf-predict:", error);
      return res.status(500).json({ message: "Failed to predict the priority via Python service" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
