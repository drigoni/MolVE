"""Train and select the best RF model on SDF datasets.

This script:
- loads two SDF files (negative / positive examples)
- computes Morgan fingerprints with RDKit
- performs a train/test split
- runs GridSearchCV over a RandomForestClassifier
- plots confusion matrix and feature importances
- saves ONLY the best model to disk.

Adjust the `NEGATIVE_SDF_PATH` and `POSITIVE_SDF_PATH` constants if
your SDF files are in different locations.
"""

import os
from pathlib import Path

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

# Update these paths if your SDF files have different names/locations
NEGATIVE_SDF_PATH = BASE_DIR / "fda_molecules.sdf"  # example: negatives
POSITIVE_SDF_PATH = BASE_DIR / "e-Drug3D_2118.sdf"  # example: positives

# Fingerprint parameters
FP_RADIUS = 2
FP_N_BITS = 2048

# Output model filename (only best model is saved)
BEST_MODEL_PATH = BASE_DIR / "best_random_forest_model.joblib"


# ---------------------------------------------------------------------------
# Data preparation
# ---------------------------------------------------------------------------

def generate_fingerprints(sdf_file_path: Path, radius: int = FP_RADIUS, n_bits: int = FP_N_BITS):
	"""Generate Morgan fingerprints from an SDF file.

	Returns a list of RDKit bit vectors (one per valid molecule).
	"""

	if not sdf_file_path.exists():
		raise FileNotFoundError(f"SDF file not found: {sdf_file_path}")

	supplier = Chem.SDMolSupplier(str(sdf_file_path))
	fingerprints = []

	for mol in supplier:
		if mol is None:
			continue
		fp = AllChem.GetMorganFingerprintAsBitVect(mol, radius, nBits=n_bits)
		fingerprints.append(fp)

	if not fingerprints:
		raise ValueError(f"No valid molecules found in {sdf_file_path}")

	return fingerprints


def prepare_dataset(negative_sdf: Path, positive_sdf: Path):
	"""Load SDF files, compute fingerprints and build X, y arrays."""

	negative_fps = generate_fingerprints(negative_sdf)
	positive_fps = generate_fingerprints(positive_sdf)

	X_negative = np.array([list(fp) for fp in negative_fps], dtype=np.int8)
	X_positive = np.array([list(fp) for fp in positive_fps], dtype=np.int8)

	y_negative = np.zeros(X_negative.shape[0], dtype=int)
	y_positive = np.ones(X_positive.shape[0], dtype=int)

	X = np.vstack((X_negative, X_positive))
	y = np.concatenate((y_negative, y_positive))

	return X, y


# ---------------------------------------------------------------------------
# Model training and selection
# ---------------------------------------------------------------------------

def train_and_select_model(X: np.ndarray, y: np.ndarray) -> RandomForestClassifier:
	"""Train RF with GridSearchCV and return the best model."""

	X_train, X_test, y_train, y_test = train_test_split(
		X, y, test_size=0.2, random_state=42, stratify=y
	)

	param_grid = {
		"n_estimators": [100, 200, 300],
		"max_depth": [None, 10, 20],
		"min_samples_split": [2, 5, 10],
	}

	rf = RandomForestClassifier(random_state=42, n_jobs=-1)

	grid_search = GridSearchCV(
		estimator=rf,
		param_grid=param_grid,
		cv=5,
		n_jobs=-1,
		verbose=2,
		scoring="accuracy",
	)

	grid_search.fit(X_train, y_train)

	best_rf: RandomForestClassifier = grid_search.best_estimator_

	print("Best parameters:", grid_search.best_params_)

	# Evaluate on the hold-out test set
	y_pred = best_rf.predict(X_test)
	acc = accuracy_score(y_test, y_pred)
	print(f"Test accuracy: {acc:.4f}")

	print("\nClassification report:")
	print(classification_report(y_test, y_pred))

	print("Confusion matrix:")
	conf_matrix = confusion_matrix(y_test, y_pred)
	print(conf_matrix)

	# Plotting
	plot_confusion_matrix(conf_matrix)
	plot_feature_importances(best_rf)

	# Optionally save test split for reproducibility / later analysis
	np.savez(
		BASE_DIR / "rf_split_data.npz",
		X_train=X_train,
		X_test=X_test,
		y_train=y_train,
		y_test=y_test,
	)

	return best_rf


# ---------------------------------------------------------------------------
# Plotting helpers
# ---------------------------------------------------------------------------

def plot_confusion_matrix(conf_matrix: np.ndarray) -> None:
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
	plt.title("Confusion Matrix - Best RF Model")
	plt.tight_layout()
	plt.savefig(BASE_DIR / "confusion_matrix.png", dpi=300)
	plt.close()


def plot_feature_importances(model: RandomForestClassifier, top_n: int = 20) -> None:
	importances = model.feature_importances_
	indices = np.argsort(importances)[::-1]

	top_n = min(top_n, len(indices))

	plt.figure(figsize=(10, 5))
	plt.title("Top Feature Importances - Best RF Model")
	plt.bar(range(top_n), importances[indices[:top_n]], align="center")
	plt.xticks(range(top_n), indices[:top_n])
	plt.xlabel("Feature index")
	plt.ylabel("Importance")
	plt.tight_layout()
	plt.savefig(BASE_DIR / "feature_importances.png", dpi=300)
	plt.close()


# ---------------------------------------------------------------------------
# Main entry point
# ---------------------------------------------------------------------------


def main() -> None:
	print("Preparing dataset from SDF files...")
	X, y = prepare_dataset(NEGATIVE_SDF_PATH, POSITIVE_SDF_PATH)

	print(f"Dataset prepared: X shape = {X.shape}, y shape = {y.shape}")

	print("\nTraining and selecting the best Random Forest model...")
	best_model = train_and_select_model(X, y)

	# Save only the best model
	joblib.dump(best_model, BEST_MODEL_PATH)
	print(f"\nBest model saved to: {BEST_MODEL_PATH}")


if __name__ == "__main__":
	main()

