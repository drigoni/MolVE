
from rdkit import Chem
from rdkit.Chem import AllChem
from rdkit.Chem import Descriptors
import pandas as pd
from rdkit.Contrib.SA_Score import sascorer
from rdkit.Contrib.NP_Score import npscorer
from tqdm import tqdm

from multiprocessing import Pool, cpu_count
import argparse






def process_molecule(mol):
    """
    Processes an RDKit molecule: calculates properties, sets them, and serializes both
    the structure and properties. Returns a tuple (molblock, properties) or None if failed.
    """
    if mol is None:
        return None
    try:
        mol_weight = Descriptors.MolWt(mol)
        smiles_string = Chem.MolToSmiles(mol, canonical=True)
        logp = Descriptors.MolLogP(mol)
        hbd = Descriptors.NumHDonors(mol)
        hba = Descriptors.NumHAcceptors(mol)
        fscore = npscorer.readNPModel()
        npscores = npscorer.scoreMolWConfidence(mol, fscore)
        nps = float(npscores[0])
        npsConfidence = float(npscores[1])
        sas = float(sascorer.calculateScore(mol))

        properties = {
            "MolecularWeight": str(mol_weight),
            "SMILES": smiles_string,
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
        print(f"Failed to process a molecule: {e}")
        return None




def main(input_sdf_path, output_sdf_path, use_multiprocessing):
    """
    Main function to process molecules from an SDF file and write to a new SDF file.
    Uses multiprocessing if specified. Handles reading, processing, and writing molecules.
    """
    supplier = Chem.SDMolSupplier(input_sdf_path)
    total_molecules = len(supplier)
    if use_multiprocessing:
        with Pool(cpu_count()) as pool:
            results = list(tqdm(pool.imap(process_molecule, supplier), total=len(supplier)))
    else:
        results = []
        for mol in tqdm(supplier):
            results.append(process_molecule(mol))

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
    print(f"Molecules written: {written_molecules} / {total_molecules}")

if __name__ == "__main__":
    """
    Entry point for command-line execution. Parses arguments and calls main().
    """
    parser = argparse.ArgumentParser(description="Process molecules and write to SDF with optional multiprocessing.")
    parser.add_argument('--input', type=str, default='e-Drug3D_2118.sdf', help='Input SDF file path')
    parser.add_argument('--output', type=str, default='fda_molecules.sdf', help='Output SDF file path')
    parser.add_argument('--multiprocessing', action='store_true', help='Enable multiprocessing for molecule processing')
    args = parser.parse_args()
    main(args.input, args.output, args.multiprocessing)