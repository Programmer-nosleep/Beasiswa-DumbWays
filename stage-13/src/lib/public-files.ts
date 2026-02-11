import fs from "fs/promises";
import path from "path";

export const PUBLIC_DIR = path.join(__dirname, "../../public");

export const toPublicUrl = (relativePosixPath: string) => `/public/${relativePosixPath.replace(/^\/+/, "")}`;

export const resolvePublicPath = (relativePosixPath: string): string | null => {
  if (typeof relativePosixPath !== "string") return null;
  const trimmed = relativePosixPath.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith("/") || trimmed.startsWith("\\")) return null;
  if (trimmed.includes("\0")) return null;

  const normalized = path.posix.normalize(trimmed);
  if (normalized === "." || normalized.startsWith("..")) return null;

  const root = path.resolve(PUBLIC_DIR);
  const absolute = path.resolve(PUBLIC_DIR, normalized);

  const rootWithSep = root.endsWith(path.sep) ? root : `${root}${path.sep}`;
  if (!absolute.toLowerCase().startsWith(rootWithSep.toLowerCase())) return null;

  return absolute;
};

export const safeUnlinkPublicFile = async (relativePosixPath: string): Promise<void> => {
  const absolute = resolvePublicPath(relativePosixPath);
  if (!absolute) return;

  try {
    await fs.unlink(absolute);
  } catch (err) {
    const code = (err as { code?: string } | null)?.code;
    if (code === "ENOENT") return;
    throw err;
  }
};
