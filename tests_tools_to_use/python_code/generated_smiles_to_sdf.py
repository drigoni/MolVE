
from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem import Descriptors
import pandas as pd
from rdkit.Contrib.SA_Score import sascorer
from rdkit.Contrib.NP_Score import npscorer
from tqdm import tqdm
from multiprocessing import Pool, cpu_count
import argparse



def embed_and_optimize(mol):
    """Embed a molecule in 3D and optimize its geometry.

    Uses ETKDG (v3 when available) for conformer generation and then
    optimizes with MMFF if parameters are available, otherwise UFF.
    Returns True on success, False on failure.
    """

    if hasattr(AllChem, "ETKDGv3"):
        params = AllChem.ETKDGv3()
    else:
        params = AllChem.ETKDG()

    params.randomSeed = -1
    params.numThreads = 0
    # params.maxAttempts = 50  # non-existent parameter in some RDKit versions

    cid = AllChem.EmbedMolecule(mol, params)
    if cid < 0:
        return False

    if AllChem.MMFFHasAllMoleculeParams(mol):
        res = AllChem.MMFFOptimizeMolecule(mol, confId=cid, maxIters=200)
    else:
        res = AllChem.UFFOptimizeMolecule(mol, confId=cid, maxIters=200)

    # Non-zero means not fully converged, but geometry is usually still usable
    return True


def process_smiles(smiles):
    """
    Convert a SMILES string to an RDKit molecule, generate 3D coordinates, optimize geometry,
    calculate molecular properties, and serialize both the structure and properties.
    Returns a tuple (molblock, properties) or None if processing fails.
    """
    try:
        mol = Chem.MolFromSmiles(smiles, sanitize=False)
        if mol is None:
            return None
        
        Chem.SanitizeMol(mol)
        mol = Chem.AddHs(mol)
        if mol is None:
            return None
        
        mol_to_smile = Chem.RemoveHs(mol, implicitOnly=True)
        smiles_new = Chem.MolToSmiles(mol_to_smile, canonical=True, allHsExplicit=False)
        if not smiles_new:
            return None

        # Attempt 3D coordinate generation and geometry optimization
        if not embed_and_optimize(mol):
            print("3D generation failed for SMILES:", smiles)
            return None


        mol_weight = Descriptors.MolWt(mol)
        logp = Descriptors.MolLogP(mol)
        hbd = Descriptors.NumHDonors(mol)
        hba = Descriptors.NumHAcceptors(mol)
        _np_model = npscorer.readNPModel()
        npscores = npscorer.scoreMolWConfidence(mol, _np_model)
        nps = float(npscores[0])
        npsConfidence = float(npscores[1])
        sas = float(sascorer.calculateScore(mol))

        properties = {
            "MolecularWeight": str(mol_weight),
            "SMILES": smiles_new,
            "LogP": str(logp),
            "hbd": str(hbd),
            "hba": str(hba),
            "sas": str(sas),
            "nps": str(nps),
            "npsConfidence": str(npsConfidence)
        }
        for k, v in properties.items():
            mol.SetProp(k, v)
        molblock = Chem.MolToMolBlock(mol)
        return (molblock, properties)
    except Exception as e:
        print(f"Error processing SMILES {smiles}: {e}")
        return None

def main(input_csv_path, output_sdf_path, use_multiprocessing):
    """
    Main function to process SMILES from a CSV file and write molecules to an SDF file.
    Uses multiprocessing if specified. Handles reading, processing, and writing molecules.
    """
    df = pd.read_csv(input_csv_path)
    smiles_list = df['New SMILES'].dropna().tolist()
    total_smiles = len(smiles_list)
    # smiles_list = smiles_list[:500]  # Limit for testing, remove or adjust as needed
    if use_multiprocessing:
        with Pool(cpu_count()) as pool:
            results = list(tqdm(pool.imap(process_smiles, smiles_list), total=len(smiles_list)))
    else:
        results = []
        for smiles in tqdm(smiles_list):
            results.append(process_smiles(smiles))

    sdf_writer = Chem.SDWriter(output_sdf_path)
    written_molecules = 0
    for item in results:
        if item is not None:
            molblock, properties = item
            mol = Chem.MolFromMolBlock(molblock, sanitize=False, strictParsing=False)
            if mol is not None and properties is not None:
                for k, v in properties.items():
                    mol.SetProp(k, v)
                sdf_writer.write(mol)
                written_molecules += 1
    sdf_writer.close()
    print(f"SDF file created: {output_sdf_path}")
    print(f"Molecules written: {written_molecules} / {total_smiles}")

if __name__ == "__main__":
    """
    Entry point for command-line execution. Parses arguments and calls main().
    """
    parser = argparse.ArgumentParser(description="Process SMILES and write to SDF with optional multiprocessing.")
    parser.add_argument('--input', type=str, default='generated_smiles.csv', help='Input CSV file path')
    parser.add_argument('--output', type=str, default='generated_molecules.sdf', help='Output SDF file path')
    parser.add_argument('--multiprocessing', action='store_true', help='Enable multiprocessing for SMILES processing')
    args = parser.parse_args()
    main(args.input, args.output, args.multiprocessing)