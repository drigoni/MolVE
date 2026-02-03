// RDKit utility functions for client-side molecular operations
declare global {
  interface Window {
    RDKitModule: any;
  }
}

export interface RDKitMolecularProperties {
  formula: string;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
}

export async function validateSmilesWithRDKit(smiles: string): Promise<boolean> {
  try {
    if (!window.RDKitModule) {
      console.warn('RDKit not loaded, using basic validation');
      return basicValidation(smiles);
    }

    const mol = window.RDKitModule.get_mol(smiles);
    if (mol) {
      mol.delete();
      return true;
    }
    return false;
  } catch (error) {
    console.error('RDKit validation error:', error);
    return basicValidation(smiles);
  }
}

export async function calculatePropertiesWithRDKit(smiles: string): Promise<RDKitMolecularProperties | null> {
  try {
    if (!window.RDKitModule) {
      console.warn('RDKit not loaded');
      return null;
    }

    const mol = window.RDKitModule.get_mol(smiles);
    if (!mol) return null;

    try {
      // Calculate properties using RDKit
      const formula = mol.get_molformula();
      const mw = mol.get_molwt();
      const logp = mol.get_clogp();
      const hbd = mol.get_numhbd();
      const hba = mol.get_numhba();

      return {
        formula: formula || 'Unknown',
        molecularWeight: parseFloat(mw) || 0,
        logP: parseFloat(logp) || 0,
        hbd: parseInt(hbd) || 0,
        hba: parseInt(hba) || 0
      };
    } finally {
      mol.delete();
    }
  } catch (error) {
    console.error('RDKit property calculation error:', error);
    return null;
  }
}

export async function generate2DStructureWithRDKit(smiles: string, width = 400, height = 400): Promise<string | null> {
  try {
    if (!window.RDKitModule) {
      console.warn('RDKit not loaded');
      return null;
    }

    const mol = window.RDKitModule.get_mol(smiles);
    if (!mol) return null;

    try {
      const svg = mol.get_svg(width, height);
      return svg;
    } finally {
      mol.delete();
    }
  } catch (error) {
    console.error('RDKit 2D structure generation error:', error);
    return null;
  }
}

export function canonicalizeSmilesWithRDKit(smiles: string): string {
  try {
    if (!window.RDKitModule) {
      return smiles;
    }

    const mol = window.RDKitModule.get_mol(smiles);
    if (!mol) return smiles;

    try {
      const canonicalSmiles = mol.get_smiles();
      return canonicalSmiles || smiles;
    } finally {
      mol.delete();
    }
  } catch (error) {
    console.error('RDKit canonicalization error:', error);
    return smiles;
  }
}

function basicValidation(smiles: string): boolean {
  if (!smiles || typeof smiles !== 'string') return false;
  
  const validChars = /^[A-Za-z0-9\[\]()@+=\-#$%\/\\\.:\*]*$/;
  if (!validChars.test(smiles)) return false;
  
  // Check balanced brackets
  let parenCount = 0;
  let bracketCount = 0;
  
  for (const char of smiles) {
    if (char === '(') parenCount++;
    else if (char === ')') parenCount--;
    else if (char === '[') bracketCount++;
    else if (char === ']') bracketCount--;
    
    if (parenCount < 0 || bracketCount < 0) return false;
  }
  
  return parenCount === 0 && bracketCount === 0;
}

export function waitForRDKit(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.RDKitModule) {
      resolve(true);
      return;
    }

    let attempts = 0;
    const maxAttempts = 50; // 5 seconds
    
    const checkInterval = setInterval(() => {
      attempts++;
      
      if (window.RDKitModule) {
        clearInterval(checkInterval);
        resolve(true);
      } else if (attempts >= maxAttempts) {
        clearInterval(checkInterval);
        resolve(false);
      }
    }, 100);
  });
}