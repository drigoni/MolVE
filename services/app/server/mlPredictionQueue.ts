import { storage } from "./storage";
import fetch from "node-fetch";

type PendingMolecule = {
  id: number;
  smiles: string;
};

const queue: PendingMolecule[] = [];
let processing = false;

export function enqueueMlPrediction(molecules: PendingMolecule | PendingMolecule[]): void {
  if (Array.isArray(molecules)) {
    queue.push(...molecules);
  } else {
    queue.push(molecules);
  }

  if (!processing) {
    processing = true;
    // Fire-and-forget; we don't await this in request handlers.
    void processQueue();
  }
}

async function processQueue(): Promise<void> {
  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) continue;

    try {
      const apiUrl = "http://python-service:8000/predict";
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ smiles: item.smiles }),
      });

      const data = (await response.json().catch(() => null)) as any;

      if (!response.ok) {
        const message = data?.detail || data?.message || "Python service error";
        console.error("ML prediction error for molecule", item.id, message);
        continue;
      }

      const prediction: number | undefined = typeof data?.prediction === "number" ? data.prediction : undefined;
      if (prediction === undefined) {
        console.error("ML prediction missing 'prediction' field for molecule", item.id, data);
        continue;
      }

      // Persist prediction on molecule row
      await storage.updateMoleculeMlPrediction(item.id, prediction);
    } catch (error) {
      console.error("Error processing ML prediction for molecule", item?.id, error);
    }
  }

  processing = false;
}
