from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem import Descriptors
import pandas as pd
from rdkit.Contrib.SA_Score import sascorer
from rdkit.Contrib.NP_Score import npscorer
from tqdm import tqdm

# Load the CSV file
csv_file_path = 'generated_smiles.csv'  # Update with the correct path if necessary
df = pd.read_csv(csv_file_path)

# Extract the "New SMILES" column
smiles_list = df['New SMILES'].dropna().tolist()

# Create RDKit Mol objects and optimize geometry
mols = []
smiles_new_list = []
for smiles in tqdm(smiles_list):
    try:
        mol = Chem.MolFromSmiles(smiles, sanitize=False)  # Disable initial sanitization
        if mol is None:
            print(f"Invalid SMILES: {smiles}")
            continue
        Chem.SanitizeMol(mol)  # Perform sanitization
        mol = Chem.AddHs(mol)
        smiles_new_list.append(Chem.MolToSmiles(mol, kekuleSmiles=True, canonical=True))
        
        # Attempt 3D coordinate generation
        if AllChem.EmbedMolecule(mol, randomSeed=42) != 0:
            print(f"Embedding failed for SMILES: {smiles}")
            continue
        
        # Attempt UFF optimization
        if AllChem.UFFOptimizeMolecule(mol) != 0:
            print(f"UFF optimization failed for SMILES: {smiles}")
            continue
        
        mols.append(mol)
    except Exception as e:
        print(f"Failed to process SMILES '{smiles}': {e}")
        continue

# Calculate properties and save to SDF
sdf_writer = Chem.SDWriter('generated_molecules.sdf')

for mol, smiles_string in zip(mols, smiles_new_list):
    # Calculate properties
    if not smiles_string:
        continue
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
    mol.SetProp("SMILES", smiles_string)
    mol.SetProp("LogP", str(logp))
    mol.SetProp("hbd", str(hbd))
    mol.SetProp("hba", str(hba))
    mol.SetProp("sas", str(sas))
    mol.SetProp("nps", str(nps))
    mol.SetProp("npsconfidence", str(npsconf))

    # Write to SDF
    sdf_writer.write(mol)

sdf_writer.close()
print("SDF file created: molecules.sdf")