import crypto from "crypto";
import fs from "fs";
import path from "path";
import multer from "multer";

export const PROJECT_IMAGE_FIELD_NAME = "image";
export const MAX_PROJECT_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

const PUBLIC_DIR = path.join(__dirname, "../../public");
const PROJECT_IMAGE_UPLOAD_DIR = path.join(PUBLIC_DIR, "uploads", "projects");

fs.mkdirSync(PROJECT_IMAGE_UPLOAD_DIR, { recursive: true });

const ALLOWED_MIME_TYPES = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"]
]);

export const projectImageUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, PROJECT_IMAGE_UPLOAD_DIR),
    filename: (_req, file, cb) => {
      const extension = ALLOWED_MIME_TYPES.get(file.mimetype);
      const filename = `${crypto.randomUUID()}${extension ?? ""}`;
      cb(null, filename);
    }
  }),
  limits: { fileSize: MAX_PROJECT_IMAGE_SIZE_BYTES },
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.has(file.mimetype)) {
      const err = new Error("Tipe file tidak didukung. Hanya gambar JPG, PNG, WebP, atau GIF yang diperbolehkan.");
      (err as Error & { code?: string }).code = "INVALID_FILE_TYPE";
      cb(err);
      return;
    }

    cb(null, true);
  }
});

export const toProjectImagePath = (filename: string) => path.posix.join("uploads", "projects", filename);
