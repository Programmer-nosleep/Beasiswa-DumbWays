import pg from "pg";

const globalForDb = globalThis as unknown as {
  pgPool?: pg.Pool;
};

export const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Create a .env file (see .env.example).");
}

export const pgPool =
  globalForDb.pgPool ??
  new pg.Pool({
    connectionString: databaseUrl
  });

if (process.env.NODE_ENV !== "production") globalForDb.pgPool = pgPool;

export const connectDb = async () => {
  await pgPool.query("SELECT 1");
};
