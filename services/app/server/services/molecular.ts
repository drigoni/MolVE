// Removed RDKit dependencies - using pure JavaScript SDF parser
import { parseSdfMolecule, parseSdfFile } from '../sdf_parser.js';
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// For ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface MolecularProperties {
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
  sas: number;
  nps: number;
  npsConfidence: number;
}

export interface MolecularStructure {
  smiles: string;
  properties: MolecularProperties;
  sdf?: string | null;
}

export async function processSdfFile(
  sdfContent: string
): Promise<MolecularStructure[]> {
  try {
    // Parse multi-molecule SDF file using pure JavaScript parser
    const molecules = parseSdfFile(sdfContent);
    
    return molecules.map(result => ({
      smiles: result.canonical_smiles,
      properties: result.properties,
      sdf: result.sdf,
    }));
  } catch (error) {
    console.error(`SDF file processing failed:`, error);
    throw error;
  }
}

export async function processSdfMolecule(
  sdfBlock: string
): Promise<MolecularStructure> {
  try {
    // Parse SDF using pure JavaScript parser
    const result = parseSdfMolecule(sdfBlock);
    
    if (!result.valid) {
      throw new Error(result.error || "Invalid SDF molecule");
    }

    return {
      smiles: result.canonical_smiles,
      properties: result.properties,
      sdf: result.sdf,
    };
  } catch (error) {
    console.error(`SDF processing failed:`, error);
    throw error;
  }
}
