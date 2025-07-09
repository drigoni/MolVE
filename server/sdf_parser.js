/**
 * Pure JavaScript SDF parser - handles multi-molecule SDF files
 * Extracts molecular properties and 3D coordinates from SDF files
 */

function parseSdfFile(sdfContent) {
  // Split by $$$$ delimiter to get individual molecules
  const moleculeBlocks = sdfContent.split('$$$$').filter(block => block.trim());
  
  const molecules = [];
  for (const block of moleculeBlocks) {
    try {
      const molecule = parseSdfMolecule(block.trim());
      if (molecule.valid) {
        molecules.push(molecule);
      }
    } catch (error) {
      console.error('Error parsing molecule block:', error);
    }
  }
  
  return molecules;
}

function parseSdfMolecule(sdfBlock) {
  try {
    const lines = sdfBlock.trim().split('\n');
    if (lines.length < 1) {
      throw new Error('Invalid SDF format - empty block');
    }

    // Extract molecule name from first line
    const molName = lines[0].trim() || 'Unknown';
    
    // Extract ONLY these 5 properties from data fields
    let molecularWeight = null;
    let logP = null;
    let hbd = null;
    let hba = null;
    let sas = null;
    let smiles = null;

    // Look for property data fields - ignore everything else
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      if (line.startsWith('> <') || line.startsWith('>  <')) {
        // Extract property name and remove any trailing content like (1), (2), etc.
        const propertyMatch = line.match(/>\s*<([^>]+)>/);
        if (propertyMatch) {
          const propertyName = propertyMatch[1].split(/\s+/)[0].toLowerCase().trim();
          const valueIndex = i + 1;
          
          if (valueIndex < lines.length && lines[valueIndex].trim()) {
            const rawValue = lines[valueIndex].trim();
            
            if (propertyName === 'molecularweight') {
              const parsed = parseFloat(rawValue);
              if (!isNaN(parsed)) molecularWeight = parsed;
            } else if (propertyName === 'logp') {
              const parsed = parseFloat(rawValue);
              if (!isNaN(parsed)) logP = parsed;
            } else if (propertyName === 'hbd') {
              const parsed = parseInt(rawValue);
              if (!isNaN(parsed)) hbd = parsed;
            } else if (propertyName === 'hba') {
              const parsed = parseInt(rawValue);
              if (!isNaN(parsed)) hba = parsed;
            } else if (propertyName === 'sas') {
              const parsed = parseFloat(rawValue);
              if (!isNaN(parsed)) sas = parsed;
            } else if (propertyName === 'smiles') {
              smiles = rawValue;
            }
          }
        }
      }
    }

    return {
      valid: true,
      name: molName,
      canonical_smiles: smiles,
      properties: {
        molecularWeight: molecularWeight,
        logP: logP,
        hbd: hbd,
        hba: hba,
        sas: sas
      },
      sdf: sdfBlock
    };

  } catch (error) {
    return {
      valid: false,
      error: `SDF parsing failed: ${error.message}`
    };
  }
}

export { parseSdfMolecule, parseSdfFile };