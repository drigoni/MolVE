import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL, ensure the database is provisioned");
}

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("Output Directory:", "./migrations");
console.log("Schema File:", "./shared/schema.ts");
console.log("Database Dialect:", "postgresql");

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
