import {
  users,
  molecules,
  evaluations,
  settings,
  apiTokens,
  type User,
  type InsertUser,
  type Molecule,
  type InsertMolecule,
  type Evaluation,
  type InsertEvaluation,
  type Setting,
  type InsertSetting,
  type EvaluationWithMolecule,
  type DashboardStats,
  type ApiToken,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPassword(id: number, password: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<void>;
  updateUser(id: number, data: Partial<InsertUser>): Promise<User>;
  updateUserLastLogin(id: number): Promise<void>;
  
  // Molecule operations
  getMolecule(id: number): Promise<Molecule | undefined>;
  getMoleculeBySmiles(smiles: string): Promise<Molecule | undefined>;
  createMolecule(molecule: InsertMolecule): Promise<Molecule>;
  createMolecules(molecules: InsertMolecule[]): Promise<Molecule[]>;
  getAllMolecules(): Promise<Molecule[]>;
  getRandomMolecule(mode?: 'all' | 'unevaluated'): Promise<Molecule | undefined>;
  deleteMolecule(id: number): Promise<void>;
  deleteAllMolecules(): Promise<void>;
  getMoleculesWithEvaluationCounts(): Promise<any[]>;
  
  // Evaluation operations
  createEvaluation(evaluation: InsertEvaluation): Promise<Evaluation>;
  getUserEvaluations(userId: number, limit?: number): Promise<EvaluationWithMolecule[]>;
  getAllEvaluations(): Promise<EvaluationWithMolecule[]>;
  deleteEvaluation(id: number): Promise<void>;
  getDashboardStats(): Promise<DashboardStats>;
  getEvaluationDataset(): Promise<any[]>;
  
  // Settings operations
  getSetting(key: string): Promise<Setting | undefined>;
  setSetting(setting: InsertSetting): Promise<Setting>;
  getAllowGuestViewing(): Promise<boolean>;

  // API token operations
  getUserApiTokens(userId: number): Promise<ApiToken[]>;
  createApiToken(userId: number): Promise<ApiToken>;
  getApiToken(id: number): Promise<ApiToken | undefined>;
  getApiTokenByToken(token: string): Promise<ApiToken | undefined>;
  deleteApiToken(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(userData: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .returning();
    return user;
  }

  async updateUserPassword(id: number, password: string): Promise<void> {
    await db
      .update(users)
      .set({ password, updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users).orderBy(users.id);
  }

  async deleteUser(id: number): Promise<void> {
    // First delete all evaluations by this user
    await db.delete(evaluations).where(eq(evaluations.userId, id));
    // Then delete the user
    await db.delete(users).where(eq(users.id, id));
  }

  async updateUser(id: number, data: Partial<InsertUser>): Promise<User> {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return user;
  }

  async updateUserLastLogin(id: number): Promise<void> {
    await db
      .update(users)
      .set({ lastLoginAt: new Date(), updatedAt: new Date() })
      .where(eq(users.id, id));
  }

  // Molecule operations
  async getMolecule(id: number): Promise<Molecule | undefined> {
    const [molecule] = await db.select().from(molecules).where(eq(molecules.id, id));
    return molecule;
  }

  async getMoleculeBySmiles(smiles: string): Promise<Molecule | undefined> {
    const [molecule] = await db.select().from(molecules).where(eq(molecules.smiles, smiles));
    return molecule;
  }

  async createMolecule(moleculeData: InsertMolecule): Promise<Molecule> {
    const [molecule] = await db
      .insert(molecules)
      .values(moleculeData)
      .returning();
    return molecule;
  }

  async createMolecules(moleculesData: InsertMolecule[]): Promise<Molecule[]> {
    return await db
      .insert(molecules)
      .values(moleculesData)
      .returning();
  }

  async getAllMolecules(): Promise<Molecule[]> {
    return await db.select().from(molecules).orderBy(molecules.id);
  }

  async getRandomMolecule(mode: 'all' | 'unevaluated' = 'all'): Promise<Molecule | undefined> {
    if (mode === 'unevaluated') {
      const [molecule] = await db
        .select()
        .from(molecules)
        .leftJoin(evaluations, eq(molecules.id, evaluations.moleculeId))
        .where(sql`${evaluations.moleculeId} IS NULL`)
        .orderBy(sql`RANDOM()`)
        .limit(1);
      return molecule?.molecules;
    } else {
      const [molecule] = await db
        .select()
        .from(molecules)
        .orderBy(sql`RANDOM()`)
        .limit(1);
      return molecule;
    }
  }

  async deleteMolecule(id: number): Promise<void> {
    // First delete all evaluations for this molecule
    await db.delete(evaluations).where(eq(evaluations.moleculeId, id));
    // Then delete the molecule
    await db.delete(molecules).where(eq(molecules.id, id));
  }

  async deleteAllMolecules(): Promise<void> {
    // First delete all evaluations
    await db.delete(evaluations);
    // Then delete all molecules
    await db.delete(molecules);
  }

  async getMoleculesWithEvaluationCounts(): Promise<any[]> {
    const results = await db
      .select({
        molecule: molecules,
        evaluationCount: sql<number>`count(${evaluations.id})::int`,
        avgEvaluation: sql<number>`
          case 
            when count(${evaluations.id}) > 0 then
              case 
                when avg(case when ${evaluations.evaluation} = 'positive' then 1 when ${evaluations.evaluation} = 'negative' then -1 else 0 end) > 0.33 then 1
                when avg(case when ${evaluations.evaluation} = 'positive' then 1 when ${evaluations.evaluation} = 'negative' then -1 else 0 end) < -0.33 then -1
                else 0
              end
            else null
          end
        `
      })
      .from(molecules)
      .leftJoin(evaluations, eq(molecules.id, evaluations.moleculeId))
      .groupBy(molecules.id)
      .orderBy(molecules.id);

    return results.map(result => ({
      ...result.molecule,
      evaluationCount: result.evaluationCount,
      averageEvaluation: result.avgEvaluation
    }));
  }

  // Evaluation operations
  async createEvaluation(evaluationData: InsertEvaluation): Promise<Evaluation> {
    const [evaluation] = await db
      .insert(evaluations)
      .values(evaluationData)
      .returning();
    return evaluation;
  }

  async getUserEvaluations(userId: number, limit = 10): Promise<EvaluationWithMolecule[]> {
    const results = await db
      .select()
      .from(evaluations)
      .innerJoin(molecules, eq(evaluations.moleculeId, molecules.id))
      .where(eq(evaluations.userId, userId))
      .orderBy(desc(evaluations.createdAt))
      .limit(limit);

    return results.map(result => ({
      ...result.evaluations,
      molecule: result.molecules,
    }));
  }

  async getAllEvaluations(): Promise<EvaluationWithMolecule[]> {
    const results = await db
      .select()
      .from(evaluations)
      .innerJoin(molecules, eq(evaluations.moleculeId, molecules.id))
      .innerJoin(users, eq(evaluations.userId, users.id))
      .orderBy(desc(evaluations.createdAt));

    return results.map(result => ({
      ...result.evaluations,
      molecule: result.molecules,
      user: result.users,
    }));
  }

  async deleteEvaluation(id: number): Promise<void> {
    await db.delete(evaluations).where(eq(evaluations.id, id));
  }

  async getDashboardStats(): Promise<DashboardStats> {
    // Get evaluation stats
    const [evalStats] = await db
      .select({
        total: sql<number>`count(*)::int`,
        prioritize: sql<number>`count(case when evaluation = 'prioritize' then 1 end)::int`,
        borderline: sql<number>`count(case when evaluation = 'borderline' then 1 end)::int`,
        doNotPrioritize: sql<number>`count(case when evaluation = 'do_not_prioritize' then 1 end)::int`,
      })
      .from(evaluations);

    // Get user count
    const [userStats] = await db
      .select({
        totalUsers: sql<number>`count(*)::int`,
      })
      .from(users);

    return {
      total: evalStats?.total || 0,
      prioritize: evalStats?.prioritize || 0,
      borderline: evalStats?.borderline || 0,
      doNotPrioritize: evalStats?.doNotPrioritize || 0,
      totalUsers: userStats?.totalUsers || 0,
    };
  }

  async getEvaluationDataset(): Promise<any[]> {
    const results = await db
      .select()
      .from(evaluations)
      .innerJoin(molecules, eq(evaluations.moleculeId, molecules.id))
      .innerJoin(users, eq(evaluations.userId, users.id))
      .orderBy(desc(evaluations.createdAt));

    return results.map(result => ({
      evaluationId: result.evaluations.id,
      moleculeId: result.molecules.id,
      smiles: result.molecules.smiles,
      molecularWeight: result.molecules.molecularWeight,
      logP: result.molecules.logP,
      hbd: result.molecules.hbd,
      hba: result.molecules.hba,
      sas: result.molecules.sas,
      nps: (result.molecules as any).nps,
      npsConfidence: (result.molecules as any).npsConfidence,
      evaluation: result.evaluations.evaluation,
      notes: result.evaluations.notes,
      issueSolubility: result.evaluations.issueSolubility,
      issueSyntheticAccessibility: result.evaluations.issueSyntheticAccessibility,
      issueDimension: result.evaluations.issueDimension,
      issuePermeability: result.evaluations.issuePermeability,
      username: result.users.username,
      evaluationDate: result.evaluations.createdAt,
    }));
  }

  // Settings operations
  async getSetting(key: string): Promise<Setting | undefined> {
    const [setting] = await db.select().from(settings).where(eq(settings.key, key));
    return setting;
  }

  async setSetting(settingData: InsertSetting): Promise<Setting> {
    const existing = await this.getSetting(settingData.key);
    
    if (existing) {
      const [updated] = await db
        .update(settings)
        .set({ 
          value: settingData.value, 
          description: settingData.description,
          updatedAt: new Date() 
        })
        .where(eq(settings.key, settingData.key))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(settings).values(settingData).returning();
      return created;
    }
  }

  async getAllowGuestViewing(): Promise<boolean> {
    const setting = await this.getSetting('allow_guest_viewing');
    return setting ? (setting.value as boolean) : false;
  }

  // API token operations
  async getUserApiTokens(userId: number): Promise<ApiToken[]> {
    return await db.select().from(apiTokens).where(eq(apiTokens.userId, userId)).orderBy(apiTokens.createdAt);
  }

  async createApiToken(userId: number): Promise<ApiToken> {
    const raw = `${userId}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const tokenValue = Buffer.from(raw).toString('base64url');
    const [token] = await db.insert(apiTokens).values({ userId, token: tokenValue }).returning();
    return token;
  }

  async getApiToken(id: number): Promise<ApiToken | undefined> {
    const [token] = await db.select().from(apiTokens).where(eq(apiTokens.id, id));
    return token;
  }

  async getApiTokenByToken(token: string): Promise<ApiToken | undefined> {
    const [row] = await db.select().from(apiTokens).where(eq(apiTokens.token, token));
    return row;
  }

  async deleteApiToken(id: number): Promise<void> {
    await db.delete(apiTokens).where(eq(apiTokens.id, id));
  }
}

export const storage = new DatabaseStorage();
