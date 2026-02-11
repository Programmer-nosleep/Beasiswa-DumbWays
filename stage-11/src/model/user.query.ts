import { pgPool } from "../../config/db";

export type UserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
};

export const createUserQuery = async (payload: {
  name: string;
  email: string;
  passwordHash: string;
}) => {
  const { name, email, passwordHash } = payload;

  const result = await pgPool.query<UserRow>(
    `
    INSERT INTO users (name, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING id, name, email, password_hash, created_at, updated_at
    `,
    [name, email, passwordHash]
  );

  return result.rows[0] ?? null;
};

export const findUserByEmailQuery = async (email: string) => {
  const result = await pgPool.query<UserRow>(
    `
    SELECT id, name, email, password_hash, created_at, updated_at
    FROM users
    WHERE email = $1
    LIMIT 1
    `,
    [email]
  );

  return result.rows[0] ?? null;
};

export const findUserByIdQuery = async (id: string) => {
  const result = await pgPool.query<UserRow>(
    `
    SELECT id, name, email, password_hash, created_at, updated_at
    FROM users
    WHERE id = $1
    LIMIT 1
    `,
    [id]
  );

  return result.rows[0] ?? null;
};

export const listUsersQuery = async () => {
  const result = await pgPool.query<Pick<UserRow, "id" | "name" | "email" | "created_at" | "updated_at">>(
    `
    SELECT id, name, email, created_at, updated_at
    FROM users
    ORDER BY created_at DESC
    `
  );

  return result.rows;
};

export const deleteUserByIdQuery = async (id: string) => {
  const result = await pgPool.query<{ id: string }>(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING id
    `,
    [id]
  );

  return result.rows[0] ?? null;
};

