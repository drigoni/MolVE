import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated, isAdmin, isUser } from "./auth";
import { processSdfMolecule } from "./services/molecular";
import { insertMoleculeSchema, insertEvaluationSchema } from "@shared/schema";
import multer from "multer";
// Removed CSV parsing - only SDF supported
import bcrypt from "bcrypt";

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

  // Only SDF upload is supported for molecule management

  app.get(
    "/api/admin/molecules",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const molecules = await storage.getAllMolecules();
        res.json(molecules);
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

        // Create CSV header
        const csvHeader =
          "ID,SMILES,Molecular Weight,LogP,HBD,HBA,SAS,Created At\n";

        // Create CSV rows
        const csvRows = molecules
          .map((mol) => {
            const createdAt = mol.createdAt
              ? new Date(mol.createdAt).toISOString()
              : "";
            return `${mol.id},"${mol.smiles}",${mol.molecularWeight},${mol.logP},${mol.hbd},${mol.hba},${mol.sas},"${createdAt}"`;
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

  app.get(
    "/api/admin/evaluations",
    isAuthenticated,
    isAdmin,
    async (req, res) => {
      try {
        const evaluations = await storage.getAllEvaluations();
        res.json(evaluations);
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
          console.error(`Processing molecule block:`, cleanBlock);

          try {
            // Process each SDF molecule block
            const structure = await processSdfMolecule(cleanBlock);

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
              sas: structure.properties.sas,
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

        // Convert to CSV format
        const csvHeader =
          "SMILES,Molecular Weight,LogP,Evaluation,Notes,Username,Date\n";
        const csvData = dataset
          .map(
            (row) =>
              `"${row.smiles}","${row.molecularWeight}","${row.logP}","${row.evaluation}","${row.notes || ""}","${row.username}","${row.evaluationDate}"`,
          )
          .join("\n");

        res.setHeader("Content-Type", "text/csv");
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="evaluations.csv"',
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

  // Admin SDF file upload route
  app.post(
    "/api/admin/molecules/upload-sdf",
    isAuthenticated,
    isAdmin,
    upload.single("sdf"),
    async (req, res) => {
      try {
        if (!req.file) {
          return res.status(400).json({ message: "SDF file is required" });
        }

        const sdfContent = req.file.buffer.toString("utf-8");
        const moleculesData: any[] = [];
        let processed = 0;
        let skipped = 0;

        // Parse SDF content into molecule blocks
        const moleculeBlocks = sdfContent.split("$$$$");

        for (const block of moleculeBlocks) {
          if (!block.trim()) continue;

          const lines = block.split("\n");
          let foundSmiles = null;

          // Look for SMILES in the SDF properties
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (line.includes("SMILES") || line.includes("<SMILES>")) {
              const nextLine = lines[i + 1]?.trim();
              if (nextLine && nextLine.length > 0 && !nextLine.includes(">")) {
                foundSmiles = nextLine;
                break;
              }
            }
          }

          if (!foundSmiles) {
            // Try to extract from molecule name or other properties
            // For now, skip molecules without SMILES
            skipped++;
            continue;
          }

          try {
            // Check if molecule already exists
            const existing = await storage.getMoleculeBySmiles(foundSmiles);
            if (existing) {
              skipped++;
              continue;
            }

            // Generate molecular structure using RDKit
            const structure = await generateMolecularStructure(foundSmiles);
            moleculesData.push({
              smiles: structure.smiles,
              molecularWeight: structure.properties.molecularWeight.toString(),
              logP: structure.properties.logP.toString(),
              hbd: structure.properties.hbd,
              hba: structure.properties.hba,
              structure2d: structure.structure2d,
              structure3d: structure.structure3d,
              sdf: structure.sdf,
            });
            processed++;
          } catch (error) {
            console.error(`Error processing SMILES ${foundSmiles}:`, error);
            skipped++;
          }
        }

        if (moleculesData.length > 0) {
          await storage.createMolecules(moleculesData);
        }

        res.json({
          message: `Successfully processed ${processed} molecules from SDF, skipped ${skipped}`,
          processed,
          skipped,
        });
      } catch (error) {
        console.error("Error processing SDF:", error);
        res.status(500).json({ message: "Failed to process SDF file" });
      }
    },
  );

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

  // Dashboard routes (admin only)
  // User stats endpoint (for regular users)
  app.get("/api/user/stats", isAuthenticated, async (req: any, res) => {
    try {
      const stats = await storage.getDashboardStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
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

  const httpServer = createServer(app);
  return httpServer;
}
