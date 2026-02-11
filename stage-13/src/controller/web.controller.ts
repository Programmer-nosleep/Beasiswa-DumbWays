import type { NextFunction, Request, Response } from "express";
import multer, { type File as MulterFile } from "multer";
import { getSafeNextUrl } from "../lib/url";
import { safeUnlinkPublicFile, toPublicUrl } from "../lib/public-files";
import {
  MAX_PROJECT_IMAGE_SIZE_BYTES,
  PROJECT_IMAGE_FIELD_NAME,
  projectImageUpload,
  toProjectImagePath
} from "../middleware/project-image-upload";
import {
  createProject,
  deleteProjectById,
  getProjectById,
  listProjects,
  updateProjectById
} from "../model/project.store";

export const renderHome = (req: Request, res: Response) => {
  res.render("index", {
    title: "Home - My App",
    activePage: "home"
  });
};

export const renderMyProject = (req: Request, res: Response) => {
  const projects = listProjects().map((project) => ({
    ...project,
    imageUrl: toPublicUrl(project.imagePath),
    duration: formatDuration(project.startDate, project.endDate),
    descriptionPreview: toPreviewText(project.description, 160)
  }));

  res.render("index", {
    title: "My Project - My App",
    activePage: "my-project",
    content: "my-project",
    projects
  });
};

export const renderNewProject = (req: Request, res: Response) => {
  res.render("index", {
    title: "Add Project - My App",
    activePage: "my-project",
    content: "my-project-form",
    isEdit: false,
    formAction: "/my-project",
    submitLabel: "Create Project",
    form: defaultProjectForm()
  });
};

export const renderProjectDetail = (req: Request, res: Response) => {
  const project = getProjectById(String(req.params.id ?? ""));
  if (!project) {
    res.status(404).render("index", {
      title: "404 - Project Not Found",
      content: "not-found"
    });
    return;
  }

  res.render("index", {
    title: `${project.title} - My App`,
    activePage: "my-project",
    content: "my-project-detail",
    project: {
      ...project,
      imageUrl: toPublicUrl(project.imagePath),
      duration: formatDuration(project.startDate, project.endDate)
    }
  });
};

export const renderEditProject = (req: Request, res: Response) => {
  const project = getProjectById(String(req.params.id ?? ""));
  if (!project) {
    res.status(404).render("index", {
      title: "404 - Project Not Found",
      content: "not-found"
    });
    return;
  }

  res.render("index", {
    title: "Edit Project - My App",
    activePage: "my-project",
    content: "my-project-form",
    isEdit: true,
    formAction: `/my-project/${project.id}`,
    submitLabel: "Update Project",
    form: {
      title: project.title,
      startDate: project.startDate,
      endDate: project.endDate,
      description: project.description,
      technologies: project.technologies,
      imageUrl: toPublicUrl(project.imagePath)
    }
  });
};

export const handleCreateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = await runProjectImageUpload(req, res);
    const form = readProjectFormFromBody(req);

    const validationError = validateProjectForm(form, { imageRequired: true, imageUploaded: Boolean(file) });
    if (validationError) {
      if (file) {
        try {
          await safeUnlinkPublicFile(toProjectImagePath(file.filename));
        } catch {
          // ignore cleanup errors
        }
      }

      res.status(400).render("index", {
        title: "Add Project - My App",
        activePage: "my-project",
        content: "my-project-form",
        isEdit: false,
        formAction: "/my-project",
        submitLabel: "Create Project",
        error: validationError,
        form
      });
      return;
    }

    const imagePath = toProjectImagePath(file!.filename);

    createProject({
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description,
      technologies: form.technologies,
      imagePath
    });

    res.redirect("/my-project");
  } catch (err) {
    const message = getMulterFriendlyMessage(err);
    const form = readProjectFormFromBody(req);
    res.status(400).render("index", {
      title: "Add Project - My App",
      activePage: "my-project",
      content: "my-project-form",
      isEdit: false,
      formAction: "/my-project",
      submitLabel: "Create Project",
      error: message,
      form
    });
  }
};

export const handleUpdateProject = async (req: Request, res: Response, next: NextFunction) => {
  const id = String(req.params.id ?? "");
  const existing = getProjectById(id);
  if (!existing) {
    res.status(404).render("index", {
      title: "404 - Project Not Found",
      content: "not-found"
    });
    return;
  }

  try {
    const file = await runProjectImageUpload(req, res);
    const form = readProjectFormFromBody(req);

    const validationError = validateProjectForm(form, { imageRequired: false, imageUploaded: Boolean(file) });
    if (validationError) {
      if (file) {
        try {
          await safeUnlinkPublicFile(toProjectImagePath(file.filename));
        } catch {
          // ignore cleanup errors
        }
      }

      res.status(400).render("index", {
        title: "Edit Project - My App",
        activePage: "my-project",
        content: "my-project-form",
        isEdit: true,
        formAction: `/my-project/${existing.id}`,
        submitLabel: "Update Project",
        error: validationError,
        form: {
          ...form,
          imageUrl: toPublicUrl(existing.imagePath)
        }
      });
      return;
    }

    const newImagePath = file ? toProjectImagePath(file.filename) : null;

    updateProjectById(existing.id, {
      title: form.title,
      startDate: form.startDate,
      endDate: form.endDate,
      description: form.description,
      technologies: form.technologies,
      ...(newImagePath ? { imagePath: newImagePath } : {})
    });

    if (newImagePath) {
      try {
        await safeUnlinkPublicFile(existing.imagePath);
      } catch {
        // ignore cleanup errors
      }
    }

    res.redirect(`/my-project/${existing.id}`);
  } catch (err) {
    const message = getMulterFriendlyMessage(err);
    const form = readProjectFormFromBody(req);
    res.status(400).render("index", {
      title: "Edit Project - My App",
      activePage: "my-project",
      content: "my-project-form",
      isEdit: true,
      formAction: `/my-project/${existing.id}`,
      submitLabel: "Update Project",
      error: message,
      form: {
        ...form,
        imageUrl: toPublicUrl(existing.imagePath)
      }
    });
  }
};

export const handleDeleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = String(req.params.id ?? "");
    const deleted = deleteProjectById(id);
    if (deleted) {
      try {
        await safeUnlinkPublicFile(deleted.imagePath);
      } catch {
        // ignore cleanup errors
      }
    }
    res.redirect("/my-project");
  } catch (err) {
    next(err as Error);
  }
};

export const renderAbout = (req: Request, res: Response) => {
  res.render("index", {
    title: "About - My App",
    activePage: "about",
    content: "about"
  });
};

export const renderContact = (req: Request, res: Response) => {
  res.render("index", {
    title: "Contact - My App",
    activePage: "contact",
    content: "contact"
  });
};

export const renderLogin = (req: Request, res: Response) => {
  const nextUrl = getSafeNextUrl(req.query.next) ?? "/my-project";
  res.render("index", {
    title: "Login - My App",
    activePage: "login",
    content: "login",
    nextUrl,
    nextUrlEncoded: encodeURIComponent(nextUrl)
  });
};

export const renderRegister = (req: Request, res: Response) => {
  const nextUrl = getSafeNextUrl(req.query.next) ?? "/my-project";
  res.render("index", {
    title: "Register - My App",
    activePage: "register",
    content: "register",
    nextUrl,
    nextUrlEncoded: encodeURIComponent(nextUrl)
  });
};

export const handleLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const nextUrl = getSafeNextUrl(req.body?.nextUrl) ?? "/my-project";

    res.status(501).render("index", {
      title: "Login - My App",
      activePage: "login",
      content: "login",
      error: "Login/auth belum diimplementasikan pada stage ini.",
      form: { email },
      nextUrl,
      nextUrlEncoded: encodeURIComponent(nextUrl)
    });
  } catch (err) {
    next(err as Error);
  }
};

export const handleRegister = (req: Request, res: Response, next: NextFunction) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const nextUrl = getSafeNextUrl(req.body?.nextUrl) ?? "/my-project";

    res.status(501).render("index", {
      title: "Register - My App",
      activePage: "register",
      content: "register",
      error: "Register/auth belum diimplementasikan pada stage ini.",
      form: { name, email },
      nextUrl,
      nextUrlEncoded: encodeURIComponent(nextUrl)
    });
  } catch (err) {
    next(err as Error);
  }
};

const runProjectImageUpload = (req: Request, res: Response) =>
  new Promise<MulterFile | null>((resolve, reject) => {
    projectImageUpload.single(PROJECT_IMAGE_FIELD_NAME)(req, res, (err) => {
      if (err) {
        reject(err);
        return;
      }

      const file = (req as Request & { file?: MulterFile }).file ?? null;
      resolve(file);
    });
  });

const defaultProjectForm = () => ({
  title: "",
  startDate: "",
  endDate: "",
  description: "",
  technologies: [] as string[],
  imageUrl: ""
});

const readProjectFormFromBody = (req: Request) => {
  const title = String(req.body?.title ?? "").trim();
  const startDate = String(req.body?.startDate ?? "").trim();
  const endDate = String(req.body?.endDate ?? "").trim();
  const description = String(req.body?.description ?? "").trim();

  const technologies = parseStringArray(req.body?.technologies).filter(Boolean);

  return { title, startDate, endDate, description, technologies };
};

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.map((item) => String(item).trim()).filter(Boolean);
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed ? [trimmed] : [];
  }
  return [];
};

const isValidDateInput = (value: string) => /^\d{4}-\d{2}-\d{2}$/.test(value);

const validateProjectForm = (
  form: ReturnType<typeof readProjectFormFromBody>,
  opts: { imageRequired: boolean; imageUploaded: boolean }
): string | null => {
  if (!form.title) return "Nama project wajib diisi.";
  if (!form.startDate || !isValidDateInput(form.startDate)) return "Tanggal mulai wajib diisi.";
  if (!form.endDate || !isValidDateInput(form.endDate)) return "Tanggal selesai wajib diisi.";
  if (!form.description) return "Deskripsi wajib diisi.";

  const start = new Date(`${form.startDate}T00:00:00.000Z`);
  const end = new Date(`${form.endDate}T00:00:00.000Z`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "Tanggal tidak valid.";
  if (start.getTime() > end.getTime()) return "Tanggal mulai harus lebih kecil atau sama dengan tanggal selesai.";

  if (opts.imageRequired && !opts.imageUploaded) return "Gambar project wajib diupload.";
  return null;
};

const formatDuration = (startDate: string, endDate: string) => {
  const start = new Date(`${startDate}T00:00:00.000Z`);
  const end = new Date(`${endDate}T00:00:00.000Z`);
  const diffDays = Math.max(0, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

  const months = Math.floor(diffDays / 30);
  if (months >= 12) {
    const years = Math.floor(months / 12);
    const leftoverMonths = months % 12;
    if (leftoverMonths === 0) return `${years} tahun`;
    return `${years} tahun ${leftoverMonths} bulan`;
  }

  if (months >= 1) return `${months} bulan`;
  return `${diffDays} hari`;
};

const toPreviewText = (value: string, maxLen: number) => {
  const trimmed = value.trim();
  if (trimmed.length <= maxLen) return trimmed;
  return `${trimmed.slice(0, Math.max(0, maxLen - 1)).trim()}…`;
};

const formatBytes = (bytes: number) => {
  const mb = bytes / (1024 * 1024);
  if (mb >= 1) return `${mb.toFixed(mb < 10 ? 1 : 0)} MB`;
  const kb = bytes / 1024;
  return `${kb.toFixed(kb < 10 ? 1 : 0)} KB`;
};

const getMulterFriendlyMessage = (err: unknown) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return `Ukuran gambar terlalu besar. Maksimal ${formatBytes(MAX_PROJECT_IMAGE_SIZE_BYTES)}.`;
    }
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return "Field upload tidak sesuai. Silakan upload ulang gambar.";
    }
    return "Gagal upload gambar.";
  }

  const maybeCode = (err as { code?: string; message?: string } | null)?.code;
  if (maybeCode === "INVALID_FILE_TYPE") {
    return (err as { message?: string } | null)?.message ?? "Tipe file tidak didukung.";
  }

  return "Gagal upload gambar.";
};
