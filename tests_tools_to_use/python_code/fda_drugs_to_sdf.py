from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem import Descriptors
import pandas as pd
from rdkit.Contrib.SA_Score import sascorer
from rdkit.Contrib.NP_Score import npscorer
from tqdm import tqdm

# Read molecules from the existing SDF file
input_sdf_path = 'e-Drug3D_2118.sdf'  # Ensure this file is uploaded to the Colab environment
supplier = Chem.SDMolSupplier(input_sdf_path)

# Prepare to write output SDF
output_sdf_path = 'fda_molecules.sdf'
sdf_writer = Chem.SDWriter(output_sdf_path)

for mol in supplier:
    if mol is None:
        print("Invalid molecule encountered, skipping...")
        continue

    try:
        # Calculate properties
        mol_weight = Descriptors.MolWt(mol)
        logp = Descriptors.MolLogP(mol)
        hbd = Descriptors.NumHDonors(mol)
        hba = Descriptors.NumHAcceptors(mol)
        fscore = npscorer.readNPModel()
        nps = npscorer.scoreMol(mol, fscore)
        npsconf = npscorer.scoreMolWConfidence(mol, fscore)
        sas = float(sascorer.calculateScore(mol))

        # Add properties to molecule
        mol.SetProp("MolecularWeight", str(mol_weight))
        mol.SetProp("LogP", str(logp))
        mol.SetProp("hbd", str(hbd))
        mol.SetProp("hba", str(hba))
        mol.SetProp("sas", str(sas))
        mol.SetProp("nps", str(nps))
        mol.SetProp("npsconfidence", str(npsconf))

        # Write to SDF
        sdf_writer.write(mol)
    except Exception as e:
        print(f"Failed to process a molecule: {e}")
        continue

sdf_writer.close()
print(f"SDF file created: {output_sdf_path}")