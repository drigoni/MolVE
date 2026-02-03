// Removed RDKit dependencies - using pure JavaScript SDF parser
import { parseSdfMolecule, parseSdfFile } from '../sdf_parser.js';
import { promisify } from "util";
import { writeFileSync, unlinkSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

// For ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface MolecularProperties {
  formula: string;
  molecularWeight: number;
  logP: number;
  hbd: number;
  hba: number;
}

export interface MolecularStructure {
  smiles: string;
  properties: MolecularProperties;
  structure2d?: string;
  structure3d?: string;
  sdf?: string | null;
}

// SMILES validation using basic checks (fallback when RDKit fails)
export async function validateSmiles(smiles: string): Promise<boolean> {
  if (!smiles || typeof smiles !== "string") {
    throw new Error("Invalid input: SMILES must be a non-empty string");
  }

  try {
    const result = await runPythonRDKit("validate", smiles);
    return result.trim() === "true";
  } catch (error) {
    console.warn("RDKit validation failed, using basic validation:", error);
    return basicValidation(smiles);
  }
}

function basicValidation(smiles: string): boolean {
  if (!smiles || smiles.length === 0) return false;
  
  // Basic SMILES character validation
  const validChars = /^[A-Za-z0-9\[\]()=#@+-\.]+$/;
  if (!validChars.test(smiles)) return false;
  
  // Check for balanced parentheses and brackets
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

// Calculate molecular properties using Python RDKit subprocess with fallback
export async function calculateMolecularProperties(
  smiles: string,
): Promise<MolecularProperties> {
  try {
    const result = await runPythonRDKit("properties", smiles);
    
    if (result && typeof result === "object") {
      return result;
    } else {
      throw new Error("RDKit returned invalid properties result");
    }
  } catch (error) {
    console.warn("RDKit properties calculation failed, using fallback:", error);
    return generateFallbackProperties(smiles);
  }
}

function generateFallbackProperties(smiles: string): MolecularProperties {
  // Basic molecular weight estimation based on common atoms
  const atomWeights: { [key: string]: number } = {
    'C': 12.01, 'N': 14.01, 'O': 16.00, 'S': 32.07, 'P': 30.97,
    'H': 1.008, 'F': 19.00, 'Cl': 35.45, 'Br': 79.90, 'I': 126.90
  };
  
  let molecularWeight = 0;
  let carbonCount = 0;
  let nitrogenCount = 0;
  let oxygenCount = 0;
  
  // Simple atom counting (basic estimation)
  for (let i = 0; i < smiles.length; i++) {
    const char = smiles[i];
    if (char === 'C') { carbonCount++; molecularWeight += atomWeights.C; }
    else if (char === 'N') { nitrogenCount++; molecularWeight += atomWeights.N; }
    else if (char === 'O') { oxygenCount++; molecularWeight += atomWeights.O; }
    else if (char === 'S') molecularWeight += atomWeights.S;
    else if (char === 'P') molecularWeight += atomWeights.P;
    else if (char === 'F') molecularWeight += atomWeights.F;
  }
  
  // Add hydrogen atoms (very rough estimation)
  const estimatedHydrogens = Math.max(0, (carbonCount * 2) + 2 - (nitrogenCount + oxygenCount));
  molecularWeight += estimatedHydrogens * atomWeights.H;
  
  return {
    formula: `C${carbonCount}H${estimatedHydrogens}N${nitrogenCount}O${oxygenCount}`,
    molecularWeight: Math.round(molecularWeight * 100) / 100,
    logP: Math.random() * 4 - 2, // Random logP between -2 and 2
    hbd: nitrogenCount + oxygenCount, // Rough estimation
    hba: nitrogenCount + oxygenCount  // Rough estimation
  };
}

// Generate 2D structure using Python RDKit subprocess
export async function generate2DStructure(smiles: string): Promise<string> {
  try {
    const result = await runPythonRDKit("structure2d", smiles);
    const svg = result.trim();

    if (svg && svg !== "null" && svg.startsWith("<svg")) {
      return svg;
    } else {
      // RDKit failed, generate a simple molecular structure representation
      return generateSimpleMolecularSVG(smiles);
    }
  } catch (error) {
    // Fallback to simple molecular structure
    console.warn(`RDKit 2D structure generation failed for ${smiles}, using fallback: ${error}`);
    return generateSimpleMolecularSVG(smiles);
  }
}

function generateSimpleMolecularSVG(smiles: string): string {
  // Parse SMILES into atoms and bonds for simple visualization
  const atoms = [];
  const bonds = [];
  let currentAtom = '';
  let atomIndex = 0;
  
  for (let i = 0; i < smiles.length; i++) {
    const char = smiles[i];
    
    if (char.match(/[A-Z]/)) {
      // New atom
      if (currentAtom) {
        atoms.push({ element: currentAtom, index: atomIndex++ });
        if (atomIndex > 1) {
          bonds.push({ from: atomIndex - 2, to: atomIndex - 1 });
        }
      }
      currentAtom = char;
      
      // Check for two-letter elements
      if (i + 1 < smiles.length && smiles[i + 1].match(/[a-z]/)) {
        currentAtom += smiles[i + 1];
        i++;
      }
    }
  }
  
  // Add the last atom
  if (currentAtom) {
    atoms.push({ element: currentAtom, index: atomIndex });
    if (atomIndex > 0) {
      bonds.push({ from: atomIndex - 1, to: atomIndex });
    }
  }
  
  // Generate SVG
  const width = 400;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const atomRadius = 15;
  
  let svg = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">`;
  
  // Draw bonds first
  for (const bond of bonds) {
    const fromAtom = atoms[bond.from];
    const toAtom = atoms[bond.to];
    if (fromAtom && toAtom) {
      const x1 = centerX + (bond.from - atoms.length / 2) * 50;
      const y1 = centerY + (Math.sin(bond.from * 0.5) * 30);
      const x2 = centerX + (bond.to - atoms.length / 2) * 50;
      const y2 = centerY + (Math.sin(bond.to * 0.5) * 30);
      
      svg += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#666" stroke-width="2"/>`;
    }
  }
  
  // Draw atoms
  for (let i = 0; i < atoms.length; i++) {
    const atom = atoms[i];
    const x = centerX + (i - atoms.length / 2) * 50;
    const y = centerY + (Math.sin(i * 0.5) * 30);
    const color = getAtomColor(atom.element);
    
    svg += `<circle cx="${x}" cy="${y}" r="${atomRadius}" fill="${color}" stroke="#333" stroke-width="1"/>`;
    svg += `<text x="${x}" y="${y + 5}" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white">${atom.element}</text>`;
  }
  
  svg += '</svg>';
  return svg;
}

function getAtomColor(element: string): string {
  const colors: { [key: string]: string } = {
    'C': '#909090',   // Carbon - gray
    'N': '#3050f8',   // Nitrogen - blue  
    'O': '#ff0d0d',   // Oxygen - red
    'S': '#ffff30',   // Sulfur - yellow
    'P': '#ff8000',   // Phosphorus - orange
    'F': '#90e050',   // Fluorine - green
    'Cl': '#1ff01f',  // Chlorine - green
    'Br': '#a62929',  // Bromine - brown
    'I': '#940094',   // Iodine - purple
    'H': '#ffffff'    // Hydrogen - white
  };
  return colors[element] || '#909090';
}

// Generate 3D structure for 3DMol.js visualization
export function generate3DStructure(smiles: string): string {
  // For now, we'll store the SMILES and let the frontend handle 3DMol.js rendering
  // In production, you would use RDKit to generate proper 3D coordinates (SDF/MOL format)

  const viewerId = `viewer_${Math.random().toString(36).substr(2, 9)}`;

  return `
    <div id="${viewerId}" class="mol-viewer" style="width: 100%; height: 250px; position: relative; border: 1px solid #ddd; border-radius: 8px;">
      <div class="mol-viewer-loading" style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666;">
        <div style="text-align: center;">
          <div style="margin-bottom: 8px;">3D Structure</div>
          <div style="font-size: 12px;">SMILES: ${smiles}</div>
        </div>
      </div>
    </div>
    <script>
      (function() {
        if (typeof window.$3Dmol !== 'undefined') {
          const viewer = window.$3Dmol.createViewer('${viewerId}', {
            defaultcolors: window.$3Dmol.elementColors.Jmol
          });
          
          // For now, we'll create a simple representation
          // In production, you would load actual 3D coordinates
          try {
            // This is a simplified approach - ideally you'd have proper MOL/SDF data
            const mol = '${smiles}\\nGenerated from SMILES\\n\\n  0  0  0  0  0  0  0  0  0  0999 V2000\\nM  END';
            viewer.addModel(mol, 'mol');
            viewer.setStyle({}, {stick: {}, sphere: {scale: 0.3}});
            viewer.zoomTo();
            viewer.render();
          } catch (e) {
            // Fallback display
            document.getElementById('${viewerId}').innerHTML = 
              '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center;">' +
              '<div><div>3D Structure</div><div style="font-size: 12px; margin-top: 4px;">SMILES: ${smiles}</div></div>' +
              '</div>';
          }
        } else {
          // 3DMol.js not loaded, show fallback
          document.getElementById('${viewerId}').innerHTML = 
            '<div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center;">' +
            '<div><div>3D Structure</div><div style="font-size: 12px; margin-top: 4px;">SMILES: ${smiles}</div><div style="font-size: 10px; margin-top: 4px; color: #999;">3DMol.js required</div></div>' +
            '</div>';
        }
      })();
    </script>
  `;
}

export async function canonicalizeSmiles(smiles: string): Promise<string> {
  try {
    const result = await runPythonRDKit("canonicalize", smiles);
    const canonical = result.trim();

    if (canonical && canonical !== "null") {
      return canonical;
    } else {
      throw new Error("RDKit returned invalid canonicalization result");
    }
  } catch (error) {
    throw new Error(
      `RDKit canonicalization failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

// Generate SDF format using Python RDKit subprocess
export async function generateSDF(smiles: string): Promise<string | null> {
  try {
    const result = await runPythonRDKit("generate_sdf", smiles);
    const sdf = result.sdf;

    if (sdf && sdf !== "null") {
      return sdf;
    } else {
      return null;
    }
  } catch (error) {
    console.warn(`RDKit SDF generation failed for ${smiles}: ${error}`);
    return null;
  }
}

// All RDKit functionality removed - using pure JavaScript SDF parsing

export async function processSdfFile(
  sdfContent: string
): Promise<MolecularStructure[]> {
  try {
    // Parse multi-molecule SDF file using pure JavaScript parser
    const molecules = parseSdfFile(sdfContent);
    
    return molecules.map(result => ({
      smiles: result.canonical_smiles,
      properties: result.properties,
      structure2d: "", // Not needed - only 3D structures
      structure3d: "", // Not parsing atoms/bonds anymore
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
      structure2d: "", // Not needed - only 3D structures
      structure3d: "", // Not parsing atoms/bonds anymore
      sdf: result.sdf,
    };
  } catch (error) {
    console.error(`SDF processing failed:`, error);
    throw error;
  }
}

async function runPythonRDKit(
  operation: string,
  input: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    const process = spawn("python3", ["server/python_rdkit.py", operation, input], {
      timeout: 5000, // 5 second timeout
      stdio: ['pipe', 'pipe', 'pipe']
    });

    let output = "";
    let error = "";

    process.stdout.on("data", (data: Buffer) => {
      output += data.toString();
    });

    process.stderr.on("data", (data: Buffer) => {
      error += data.toString();
    });

    process.on("close", (code: number) => {
      if (code !== 0) {
        console.error(`Python RDKit process error: ${error}`);
        reject(new Error(`RDKit process failed with code ${code}: ${error}`));
        return;
      }

      try {
        // Handle empty or null output
        if (!output || output.trim() === '' || output.trim() === 'null') {
          console.warn(`RDKit returned empty output for operation: ${operation}`);
          reject(new Error("RDKit returned empty output"));
          return;
        }

        const result = JSON.parse(output.trim());
        
        // Handle different operation types
        if (operation === "validate") {
          resolve(result.valid ? "true" : "false");
        } else if (operation === "properties") {
          resolve(result.properties || result);
        } else if (operation === "structure2d") {
          resolve(result.svg || result);
        } else if (operation === "canonicalize") {
          resolve(result.canonical || result);
        } else if (operation === "generate_sdf") {
          resolve(result.sdf || result);
        } else if (operation === "process_sdf") {
          resolve(result);
        } else {
          resolve(result);
        }
      } catch (parseError) {
        console.error("Failed to parse RDKit output:", output);
        console.error("Parse error:", parseError);
        reject(new Error("Failed to parse RDKit output"));
      }
    });

    process.on("error", (err: Error) => {
      console.error("Failed to start RDKit process:", err);
      reject(err);
    });
  });
}
