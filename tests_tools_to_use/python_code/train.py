"""Train and select a Random Forest model on SDF datasets.

Features:
- Loads two SDF files (negative / positive examples) with RDKit.
- Computes Morgan fingerprints.
- Performs a stratified train/test split with a configurable test size.
- Runs GridSearchCV over RandomForest hyperparameters by default.
- Plots confusion matrix and feature importances.
- Saves ONLY the best model to disk (joblib).

Default paths match the original script behavior, but you can override
them via CLI. Example:

    python train.py \
        --negative-sdf generated_molecules.sdf \
        --positive-sdf e-Drug3D_2118.sdf \
        --output best_random_forest_model.joblib
"""

import argparse
import logging
from pathlib import Path
from typing import Iterable, List, Optional, Sequence, Tuple, Union

import joblib
import matplotlib.pyplot as plt
import numpy as np
import seaborn as sns
from rdkit import Chem
from rdkit.Chem import AllChem
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
	accuracy_score,
	classification_report,
	confusion_matrix,
)
from sklearn.model_selection import GridSearchCV, train_test_split


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

# Default paths (kept for backward compatibility)
DEFAULT_NEGATIVE_SDF_PATH = BASE_DIR / "generated_molecules.sdf"  # negatives
DEFAULT_POSITIVE_SDF_PATH = BASE_DIR / "e-Drug3D_2118.sdf"  # positives
DEFAULT_BEST_MODEL_PATH = BASE_DIR / "best_random_forest_model.joblib"

# Fingerprint parameters
FP_RADIUS = 2
FP_N_BITS = 2048

RANDOM_STATE = 42


# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------

def setup_logging(verbosity: int) -> None:
	"""Configure basic logging."""
	level = logging.WARNING
	if verbosity == 1:
		level = logging.INFO
	elif verbosity >= 2:
		level = logging.DEBUG

	logging.basicConfig(
		level=level,
		format="%(asctime)s [%(levelname)s] %(message)s",
	)


logger = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Data preparation
# ---------------------------------------------------------------------------

def generate_fingerprints(
	sdf_file_path: Path,
	radius: int = FP_RADIUS,
	n_bits: int = FP_N_BITS,
) -> List:
	"""Generate Morgan fingerprints from an SDF file.

	Returns a list of RDKit bit vectors (one per valid molecule).
	"""
	if not sdf_file_path.exists():
		raise FileNotFoundError(f"SDF file not found: {sdf_file_path}")

	logger.info("Loading SDF file: %s", sdf_file_path)
	supplier = Chem.SDMolSupplier(str(sdf_file_path))

	if supplier is None or len(supplier) == 0:
		raise ValueError(f"No molecules parsed from {sdf_file_path}")

	fingerprints: List = []
	invalid_count = 0

	for mol in supplier:
		if mol is None:
			invalid_count += 1
			continue
		fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=n_bits)
		fingerprints.append(fp)

	logger.info(
		"Generated %d fingerprints from %s (skipped %d invalid molecules)",
		len(fingerprints),
		sdf_file_path,
		invalid_count,
	)

	if not fingerprints:
		raise ValueError(f"No valid molecules found in {sdf_file_path}")

	return fingerprints


def _fps_to_numpy(fps: Sequence) -> np.ndarray:
	"""Convert a sequence of RDKit bit vectors to a 2D NumPy array."""
	arr = np.array(
		[[int(bit) for bit in fp.ToBitString()] for fp in fps],
		dtype=np.int8,
	)
	return arr


def prepare_dataset(
	negative_sdf: Path,
	positive_sdf: Path,
) -> Tuple[np.ndarray, np.ndarray]:
	"""Load SDF files, compute fingerprints and build X, y arrays."""
	negative_fps = generate_fingerprints(negative_sdf)
	positive_fps = generate_fingerprints(positive_sdf)

	X_negative = _fps_to_numpy(negative_fps)
	X_positive = _fps_to_numpy(positive_fps)

	y_negative = np.zeros(X_negative.shape[0], dtype=int)
	y_positive = np.ones(X_positive.shape[0], dtype=int)

	X = np.vstack((X_negative, X_positive))
	y = np.concatenate((y_negative, y_positive))

	logger.info(
		"Dataset prepared: %d negatives, %d positives, shape X=%s",
		X_negative.shape[0],
		X_positive.shape[0],
		X.shape,
	)

	return X, y


# ---------------------------------------------------------------------------
# Model training and selection
# ---------------------------------------------------------------------------

def _build_param_grid(
	n_estimators: Optional[Iterable[int]],
	max_depth: Optional[Iterable[Union[int, None, str]]],
	min_samples_split: Optional[Iterable[int]],
) -> dict:
	"""Build parameter grid for GridSearchCV, skipping any None inputs."""
	param_grid = {}
	if n_estimators is not None:
		param_grid["n_estimators"] = list(n_estimators)
	if max_depth is not None:
		param_grid["max_depth"] = [
			None if isinstance(d, str) and d.lower() == "none" else int(d)
			for d in max_depth
		]
	if min_samples_split is not None:
		param_grid["min_samples_split"] = list(min_samples_split)
	return param_grid


def train_and_select_model(
	X: np.ndarray,
	y: np.ndarray,
	use_grid_search: bool = True,
	param_grid: Optional[dict] = None,
	test_size: float = 0.2,
	random_state: int = RANDOM_STATE,
	plots: bool = True,
	output_dir: Path = BASE_DIR,
) -> RandomForestClassifier:
	"""Train RF model (optionally with GridSearchCV) and return the best model."""
	if test_size <= 0 or test_size >= 0.5:
		raise ValueError("test_size should be in (0, 0.5) for robust evaluation")

	logger.info("Splitting dataset: test_size=%.2f", test_size)
	X_train, X_test, y_train, y_test = train_test_split(
		X,
		y,
		test_size=test_size,
		random_state=random_state,
		stratify=y,
	)

	base_rf = RandomForestClassifier(
		random_state=random_state,
		n_jobs=-1,
	)

	if use_grid_search:
		if not param_grid:
			param_grid = {
				"n_estimators": [100, 200, 300],
				"max_depth": [None, 10, 20],
				"min_samples_split": [2, 5, 10],
			}
		logger.info("Starting GridSearchCV with param_grid=%s", param_grid)
		rf = GridSearchCV(
			estimator=base_rf,
			param_grid=param_grid,
			cv=5,
			n_jobs=-1,
			verbose=2,
			scoring="accuracy",
		)
		rf.fit(X_train, y_train)
		best_rf: RandomForestClassifier = rf.best_estimator_
		logger.info("Best parameters from GridSearchCV: %s", rf.best_params_)
	else:
		logger.info("Training RandomForest without GridSearchCV")
		base_rf.fit(X_train, y_train)
		best_rf = base_rf

	# Evaluate on the hold-out test set
	y_pred = best_rf.predict(X_test)
	acc = accuracy_score(y_test, y_pred)

	logger.info("Test accuracy: %.4f", acc)
	print(f"Test accuracy: {acc:.4f}\n")

	print("Classification report:")
	print(classification_report(y_test, y_pred))

	conf_matrix = confusion_matrix(y_test, y_pred)
	print("Confusion matrix:")
	print(conf_matrix)

	if plots:
		plot_confusion_matrix(conf_matrix, output_dir)
		plot_feature_importances(best_rf, output_dir)

	# Save test split for reproducibility / later analysis
	split_path = output_dir / "rf_split_data.npz"
	np.savez(
		split_path,
		X_train=X_train,
		X_test=X_test,
		y_train=y_train,
		y_test=y_test,
	)
	logger.info("Train/test split saved to %s", split_path)

	return best_rf


# ---------------------------------------------------------------------------
# Plotting helpers
# ---------------------------------------------------------------------------

def plot_confusion_matrix(
	conf_matrix: np.ndarray,
	output_dir: Path,
) -> None:
	output_dir.mkdir(parents=True, exist_ok=True)
	plt.figure(figsize=(6, 5))
	sns.heatmap(
		conf_matrix,
		annot=True,
		fmt="d",
		cmap="Blues",
		xticklabels=["Negative", "Positive"],
		yticklabels=["Negative", "Positive"],
	)
	plt.xlabel("Predicted")
	plt.ylabel("Actual")
	plt.title("Confusion Matrix - Random Forest Model")
	plt.tight_layout()
	out_path = output_dir / "confusion_matrix.png"
	plt.savefig(out_path, dpi=300)
	plt.close()
	logger.info("Confusion matrix plot saved to %s", out_path)


def plot_feature_importances(
	model: RandomForestClassifier,
	output_dir: Path,
	top_n: int = 20,
) -> None:
	output_dir.mkdir(parents=True, exist_ok=True)

	importances = model.feature_importances_
	indices = np.argsort(importances)[::-1]

	top_n = min(top_n, len(indices))

	plt.figure(figsize=(10, 5))
	plt.title("Top Feature Importances - Random Forest Model")
	plt.bar(range(top_n), importances[indices[:top_n]], align="center")
	plt.xticks(range(top_n), indices[:top_n])
	plt.xlabel("Feature index")
	plt.ylabel("Importance")
	plt.tight_layout()
	out_path = output_dir / "feature_importances.png"
	plt.savefig(out_path, dpi=300)
	plt.close()
	logger.info("Feature importances plot saved to %s", out_path)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def parse_args(argv: Optional[Sequence[str]] = None) -> argparse.Namespace:
	parser = argparse.ArgumentParser(
		description="Train a RandomForest classifier on SDF data.",
	)
	parser.add_argument(
		"--negative-sdf",
		type=Path,
		default=DEFAULT_NEGATIVE_SDF_PATH,
		help=(
			"Path to SDF with negative examples "
			f"(default: {DEFAULT_NEGATIVE_SDF_PATH})"
		),
	)
	parser.add_argument(
		"--positive-sdf",
		type=Path,
		default=DEFAULT_POSITIVE_SDF_PATH,
		help=(
			"Path to SDF with positive examples "
			f"(default: {DEFAULT_POSITIVE_SDF_PATH})"
		),
	)
	parser.add_argument(
		"--output",
		type=Path,
		default=DEFAULT_BEST_MODEL_PATH,
		help=(
			"Path where the best model will be saved "
			f"(default: {DEFAULT_BEST_MODEL_PATH})"
		),
	)
	parser.add_argument(
		"--test-size",
		type=float,
		default=0.2,
		help=(
			"Fraction of data used as test set (default: 0.2). "
			"Should be in (0, 0.5)."
		),
	)
	parser.add_argument(
		"--no-grid-search",
		dest="grid_search",
		action="store_false",
		help="Disable GridSearchCV and train a single RandomForest.",
	)
	parser.add_argument(
		"--grid-search",
		dest="grid_search",
		action="store_true",
		help="Enable GridSearchCV (default).",
	)
	parser.set_defaults(grid_search=True)

	parser.add_argument(
		"--n-estimators",
		type=int,
		nargs="+",
		default=[100, 200, 300],
		help="List of n_estimators values for grid search (default: 100 200 300).",
	)
	parser.add_argument(
		"--max-depth",
		type=str,
		nargs="+",
		default=["None", "10", "20"],
		help=(
			"List of max_depth values for grid search (use 'None' for unlimited). "
			"Default: None 10 20"
		),
	)
	parser.add_argument(
		"--min-samples-split",
		type=int,
		nargs="+",
		default=[2, 5, 10],
		help=(
			"List of min_samples_split values for grid search "
			"(default: 2 5 10)."
		),
	)
	parser.add_argument(
		"--no-plots",
		dest="plots",
		action="store_false",
		help="Disable generation of confusion matrix and feature importance plots.",
	)
	parser.add_argument(
		"--plots",
		dest="plots",
		action="store_true",
		help="Enable plotting (default).",
	)
	parser.set_defaults(plots=True)

	parser.add_argument(
		"-v",
		"--verbose",
		action="count",
		default=0,
		help="Increase verbosity (can be specified multiple times).",
	)

	return parser.parse_args(argv)


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


def main(argv: Optional[Sequence[str]] = None) -> None:
	args = parse_args(argv)
	setup_logging(args.verbose)

	logger.info("Starting training with arguments: %s", args)

	X, y = prepare_dataset(args.negative_sdf, args.positive_sdf)
	print(f"Dataset prepared: X shape = {X.shape}, y shape = {y.shape}")

	param_grid = _build_param_grid(
		n_estimators=args.n_estimators if args.grid_search else None,
		max_depth=args.max_depth if args.grid_search else None,
		min_samples_split=args.min_samples_split if args.grid_search else None,
	)

	print("\nTraining and selecting the Random Forest model...")
	best_model = train_and_select_model(
		X=X,
		y=y,
		use_grid_search=args.grid_search,
		param_grid=param_grid if args.grid_search else None,
		test_size=args.test_size,
		random_state=RANDOM_STATE,
		plots=args.plots,
		output_dir=args.output.parent if args.output.parent != Path("") else BASE_DIR,
	)

	# Save only the best model
	args.output.parent.mkdir(parents=True, exist_ok=True)
	joblib.dump(best_model, args.output)
	print(f"\nBest model saved to: {args.output}")
	logger.info("Best model saved to %s", args.output)


if __name__ == "__main__":
	main()

