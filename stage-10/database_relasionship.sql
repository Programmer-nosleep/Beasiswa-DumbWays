-- ---------------------------------------------------------
-- CREATE TABLE: users
-- Purpose: Store user accounts (admin/editor/viewer), authentication, and audit fields.
-- - password_hash: store hashed password (never store plain text password)
-- - role/is_active: access control and account enable/disable
-- - last_login_at: optional tracking
-- - created_at/updated_at: audit timestamps
-- ---------------------------------------------------------
CREATE TABLE users (
  id            BIGSERIAL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  username      VARCHAR(60)  NOT NULL UNIQUE,
  email         VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          user_role NOT NULL DEFAULT 'admin',
  is_active     BOOLEAN NOT NULL DEFAULT TRUE,

  last_login_at TIMESTAMPTZ NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE TRIGGER: trg_users_updated_at
-- Purpose: Auto-update users.updated_at whenever a users row is updated.
-- ---------------------------------------------------------
CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------
-- CREATE TABLE: projects
-- Purpose: Portfolio projects to be displayed on the website.
-- - slug: unique URL-friendly identifier (e.g. /projects/my-project)
-- - is_featured: mark projects for homepage highlight
-- - status: draft/published/archived to control visibility
-- ---------------------------------------------------------
CREATE TABLE projects (
  id              BIGSERIAL PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  slug            VARCHAR(220) NOT NULL UNIQUE,
  summary         VARCHAR(300),
  description     TEXT,

  cover_image_url VARCHAR(500),
  repo_url        VARCHAR(500),
  demo_url        VARCHAR(500),

  start_date      DATE,
  end_date        DATE,
  is_featured     BOOLEAN NOT NULL DEFAULT FALSE,
  status          content_status NOT NULL DEFAULT 'published',

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE INDEX: idx_projects_status_featured
-- Purpose: Speed up queries filtering by status and featured flag.
-- Common query: WHERE status='published' ORDER BY is_featured DESC
-- ---------------------------------------------------------
CREATE INDEX idx_projects_status_featured ON projects(status, is_featured);

-- ---------------------------------------------------------
-- CREATE TRIGGER: trg_projects_updated_at
-- Purpose: Auto-update projects.updated_at whenever a projects row is updated.
-- ---------------------------------------------------------
CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------
-- CREATE TABLE: tags
-- Purpose: Master list of tags used by both projects and posts.
-- - name/slug are unique to avoid duplicates
-- ---------------------------------------------------------
CREATE TABLE tags (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(80) NOT NULL UNIQUE,
  slug       VARCHAR(90) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE TRIGGER: trg_tags_updated_at
-- Purpose: Auto-update tags.updated_at whenever a tags row is updated.
-- ---------------------------------------------------------
CREATE TRIGGER trg_tags_updated_at
BEFORE UPDATE ON tags
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------
-- CREATE TABLE: project_tags
-- Purpose: Many-to-many relationship between projects and tags.
-- - One project can have many tags; one tag can belong to many projects.
-- - ON DELETE CASCADE: if a project/tag is deleted, related rows are removed automatically.
-- ---------------------------------------------------------
CREATE TABLE project_tags (
  project_id BIGINT NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag_id     BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (project_id, tag_id)
);

-- ---------------------------------------------------------
-- CREATE TABLE: posts
-- Purpose: Blog posts/articles for the personal website.
-- - author_id: who created the post
-- - status/published_at: publishing workflow
-- ---------------------------------------------------------
CREATE TABLE posts (
  id              BIGSERIAL PRIMARY KEY,
  author_id       BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,

  title           VARCHAR(220) NOT NULL,
  slug            VARCHAR(240) NOT NULL UNIQUE,
  excerpt         VARCHAR(400),
  content         TEXT NOT NULL,

  cover_image_url VARCHAR(500),
  status          content_status NOT NULL DEFAULT 'draft',
  published_at    TIMESTAMPTZ,

  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE INDEX: idx_posts_status_published
-- Purpose: Speed up listing published posts ordered by publish time.
-- Common query: WHERE status='published' ORDER BY published_at DESC
-- ---------------------------------------------------------
CREATE INDEX idx_posts_status_published ON posts(status, published_at);

-- ---------------------------------------------------------
-- CREATE TRIGGER: trg_posts_updated_at
-- Purpose: Auto-update posts.updated_at whenever a posts row is updated.
-- ---------------------------------------------------------
CREATE TRIGGER trg_posts_updated_at
BEFORE UPDATE ON posts
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------
-- CREATE TABLE: post_tags
-- Purpose: Many-to-many relationship between posts and tags.
-- - ON DELETE CASCADE ensures tag relations disappear when a post/tag is removed.
-- ---------------------------------------------------------
CREATE TABLE post_tags (
  post_id    BIGINT NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  tag_id     BIGINT NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (post_id, tag_id)
);

-- ---------------------------------------------------------
-- CREATE TABLE: contact_messages
-- Purpose: Store inbound messages from a "Contact Me" form.
-- - ip_address/user_agent: useful for anti-spam and diagnostics
-- - is_read: admin inbox status
-- ---------------------------------------------------------
CREATE TABLE contact_messages (
  id         BIGSERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  email      VARCHAR(190) NOT NULL,
  subject    VARCHAR(200),
  message    TEXT NOT NULL,

  ip_address INET,
  user_agent VARCHAR(255),
  is_read    BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE INDEX: idx_contact_is_read_created
-- Purpose: Speed up admin inbox queries like "unread first" or recent messages.
-- ---------------------------------------------------------
CREATE INDEX idx_contact_is_read_created ON contact_messages(is_read, created_at);

-- ---------------------------------------------------------
-- CREATE INDEX: idx_contact_email
-- Purpose: Speed up searching messages by email address.
-- ---------------------------------------------------------
CREATE INDEX idx_contact_email ON contact_messages(email);

-- ---------------------------------------------------------
-- CREATE TABLE: settings
-- Purpose: Key-value configuration store for site content/settings.
-- Example keys: site_title, about_me, github_url, linkedin_url, hero_headline
-- ---------------------------------------------------------
CREATE TABLE settings (
  key        VARCHAR(100) PRIMARY KEY,
  value      TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE TRIGGER: trg_settings_updated_at
-- Purpose: Auto-update settings.updated_at whenever a setting is updated.
-- ---------------------------------------------------------
CREATE TRIGGER trg_settings_updated_at
BEFORE UPDATE ON settings
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ---------------------------------------------------------
-- CREATE TABLE: page_views
-- Purpose: Simple privacy-friendly analytics to track page visits.
-- - path: page route visited
-- - referrer: traffic source
-- - ip_hash: store a hash (not raw IP) for privacy
-- ---------------------------------------------------------
CREATE TABLE page_views (
  id         BIGSERIAL PRIMARY KEY,
  path       VARCHAR(500) NOT NULL,
  referrer   VARCHAR(500),

  ip_hash    CHAR(64),
  user_agent VARCHAR(255),

  viewed_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- CREATE INDEX: idx_views_path_time
-- Purpose: Speed up analytics queries by page and time (e.g. views per page per day).
-- ---------------------------------------------------------
CREATE INDEX idx_views_path_time ON page_views(path, viewed_at);

-- =========================================================
-- END OF SCHEMA
-- =========================================================
