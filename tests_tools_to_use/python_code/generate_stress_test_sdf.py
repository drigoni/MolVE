from rdkit import Chem
from tqdm import tqdm
import argparse


def load_molecules(input_sdf_path: str):
	"""Load molecules from an SDF file without altering them.

	Coordinates, properties, and conformers are kept as-is
	(no sanitization, no H removal), as requested.
	"""

	suppl = Chem.SDMolSupplier(input_sdf_path, removeHs=False, sanitize=False)
	mols = [mol for mol in suppl if mol is not None]
	return mols


def replicate_molecules(molecules, target_count: int):
	"""Replicate molecules until reaching ``target_count``.

	- All coordinates and properties are copied exactly.
	- The ONLY change on the replicated copies is the "SMILES" property,
	  where a single "C" character is appended to the existing value.
	- Original molecules from the input SDF are left untouched.
	"""

	if not molecules:
		raise ValueError("No molecules found in input SDF.")

	original_count = len(molecules)
	if original_count >= target_count:
		# Nothing to replicate, just truncate if needed
		return molecules[:target_count]

	output_mols = list(molecules)
	remaining = target_count - original_count

	# Store the original SMILES per base molecule so that
	# each copy gets incrementally more "C" appended
	base_smiles_list = []
	for mol in molecules:
		if mol.HasProp("SMILES"):
			base_smiles_list.append(mol.GetProp("SMILES"))
		else:
			base_smiles_list.append("")

	# Track how many times we've replicated each original molecule
	rep_counts = [0] * original_count

	idx = 0
	with tqdm(total=remaining, desc="Replicating molecules") as pbar:
		while remaining > 0:
			orig_idx = idx % original_count
			base_mol = molecules[orig_idx]

			# Create a copy so we don't touch the original
			new_mol = Chem.Mol(base_mol)

			# Determine how many times this particular base molecule
			# has been replicated so far and build the new SMILES
			rep_counts[orig_idx] += 1
			k = rep_counts[orig_idx]
			old_smiles = base_smiles_list[orig_idx]
			new_smiles = old_smiles + ("C" * k)
			new_mol.SetProp("SMILES", new_smiles)

			output_mols.append(new_mol)

			remaining -= 1
			idx += 1
			pbar.update(1)

	return output_mols


def write_molecules(output_sdf_path: str, molecules):
	"""Write molecules to an SDF file exactly as they are in memory."""

	writer = Chem.SDWriter(output_sdf_path)
	for mol in tqdm(molecules, desc="Writing SDF"):
		if mol is not None:
			writer.write(mol)
	writer.close()


def main():
	parser = argparse.ArgumentParser(
		description=(
			"Replicate molecules from an input SDF up to a target count "
			"without changing anything except the SMILES property on copies."
		)
	)

	parser.add_argument(
		"--input",
		type=str,
		default="generated_molecules.sdf",
		help="Input SDF file (default: generated_molecules.sdf)",
	)
	parser.add_argument(
		"--output",
		type=str,
		default="generated_molecules_stress_250k.sdf",
		help="Output SDF file (default: generated_molecules_stress_250k.sdf)",
	)
	parser.add_argument(
		"--target",
		type=int,
		default=250000,
		help="Target number of molecules in the output SDF (default: 250000)",
	)

	args = parser.parse_args()

	print(f"Loading molecules from {args.input} ...")
	mols = load_molecules(args.input)
	print(f"Loaded {len(mols)} molecules from input SDF.")

	print(f"Replicating up to {args.target} molecules ...")
	all_mols = replicate_molecules(mols, args.target)
	print(f"Total molecules to write: {len(all_mols)}")

	print(f"Writing output SDF to {args.output} ...")
	write_molecules(args.output, all_mols)
	print("Done.")


if __name__ == "__main__":
	main()

