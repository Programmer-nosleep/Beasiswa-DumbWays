-- =========================================================
-- Personal Web Project Schema (PostgreSQL)
-- Includes: users, projects, posts, tags, contact, settings, analytics
-- With comments explaining each CREATE / object purpose.
-- =========================================================

-- ---------------------------------------------------------
-- CREATE DATABASE
-- Purpose: Create a dedicated database for the personal web project.
-- Note: CREATE DATABASE must be run outside a transaction and usually
-- from a "postgres" or admin connection, not inside the target DB itself.
-- ---------------------------------------------------------
CREATE DATABASE personal_web;

-- =========================================================
-- After creating DB, connect to it (example):
-- \c personal_web
-- =========================================================

-- ---------------------------------------------------------
-- CREATE TYPE: user_role
-- Purpose: Define allowed roles for users (access control).
-- Prevents inconsistent role strings.
-- ---------------------------------------------------------
CREATE TYPE user_role AS ENUM ('admin','editor','viewer');

-- ---------------------------------------------------------
-- CREATE TYPE: content_status
-- Purpose: Define allowed statuses for content (posts/projects).
-- Used for drafts, published content, and archived content.
-- ---------------------------------------------------------
CREATE TYPE content_status AS ENUM ('draft','published','archived');

-- ---------------------------------------------------------
-- CREATE FUNCTION: set_updated_at()
-- Purpose: PostgreSQL doesn't have MySQL's "ON UPDATE CURRENT_TIMESTAMP".
-- This trigger function updates the updated_at column automatically on UPDATE.
-- ---------------------------------------------------------
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
