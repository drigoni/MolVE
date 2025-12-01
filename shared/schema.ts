import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  serial,
  integer,
  decimal,
  boolean,
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Session storage table
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 50 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(), // hashed password
  role: varchar("role", { length: 20 }).default("user").notNull(), // 'admin' or 'user'
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Molecules table
export const molecules = pgTable("molecules", {
  id: serial("id").primaryKey(),
  smiles: text("smiles"),
  molecularWeight: text("molecular_weight"),
  logP: text("log_p"),
  hbd: integer("hbd"),
  hba: integer("hba"),
  sas: text("sas"),
  sdf: text("sdf"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Evaluations table
export const evaluations = pgTable("evaluations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  moleculeId: integer("molecule_id").notNull().references(() => molecules.id),
  evaluation: text("evaluation").notNull(), // 'positive', 'negative', 'borderline'
  notes: text("notes"),
  issueSolubility: boolean("issue_solubility").default(false),
  issueSyntheticAccessibility: boolean("issue_synthetic_accessibility").default(false),
  issueDimension: boolean("issue_dimension").default(false),
  issuePermeability: boolean("issue_permeability").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// API tokens table for programmatic access
export const apiTokens = pgTable("api_tokens", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Settings table for application configuration
export const settings = pgTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 255 }).unique().notNull(),
  value: jsonb("value").notNull(),
  description: text("description"),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  evaluations: many(evaluations),
  apiTokens: many(apiTokens),
}));

export const moleculesRelations = relations(molecules, ({ many }) => ({
  evaluations: many(evaluations),
}));

export const evaluationsRelations = relations(evaluations, ({ one }) => ({
  user: one(users, {
    fields: [evaluations.userId],
    references: [users.id],
  }),
  molecule: one(molecules, {
    fields: [evaluations.moleculeId],
    references: [molecules.id],
  }),
}));

export const apiTokensRelations = relations(apiTokens, ({ one }) => ({
  user: one(users, {
    fields: [apiTokens.userId],
    references: [users.id],
  }),
}));

// Schemas
export const insertMoleculeSchema = createInsertSchema(molecules).omit({
  id: true,
  createdAt: true,
});

export const insertEvaluationSchema = createInsertSchema(evaluations).omit({
  id: true,
  createdAt: true,
});

export const insertSettingSchema = createInsertSchema(settings).omit({
  id: true,
  updatedAt: true,
});

export type InsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type InsertMolecule = z.infer<typeof insertMoleculeSchema>;
export type Molecule = typeof molecules.$inferSelect;
export type InsertEvaluation = z.infer<typeof insertEvaluationSchema>;
export type Evaluation = typeof evaluations.$inferSelect;
export type InsertSetting = z.infer<typeof insertSettingSchema>;
export type Setting = typeof settings.$inferSelect;
export type ApiToken = typeof apiTokens.$inferSelect;

// Evaluation with relations
export type EvaluationWithMolecule = Evaluation & {
  molecule: Molecule;
};

// Dashboard stats type
export type DashboardStats = {
  total: number;
  positive: number;
  negative: number;
  borderline: number;
  awesome: number;
  futuristic: number;
  totalUsers: number;
};
