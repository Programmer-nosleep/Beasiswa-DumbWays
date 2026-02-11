import { pgPool } from "../../config/db";

export const pingDb = async () => {
  return pgPool.query("SELECT 1 as ok");
};

