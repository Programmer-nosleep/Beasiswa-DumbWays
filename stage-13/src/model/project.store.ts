import crypto from "crypto";

export type Project = {
  id: string;
  title: string;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  description: string;
  technologies: string[];
  imagePath: string; // relative to /public
  createdAt: Date;
  updatedAt: Date;
};

export type CreateProjectPayload = Omit<Project, "id" | "createdAt" | "updatedAt">;
export type UpdateProjectPayload = Partial<Omit<Project, "id" | "createdAt" | "updatedAt">>;

const projects = new Map<string, Project>();

export const listProjects = () =>
  Array.from(projects.values()).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

export const getProjectById = (id: string) => projects.get(id) ?? null;

export const createProject = (payload: CreateProjectPayload) => {
  const now = new Date();
  const project: Project = {
    id: crypto.randomUUID(),
    ...payload,
    createdAt: now,
    updatedAt: now
  };

  projects.set(project.id, project);
  return project;
};

export const updateProjectById = (id: string, payload: UpdateProjectPayload) => {
  const existing = projects.get(id);
  if (!existing) return null;

  const updated: Project = {
    ...existing,
    ...payload,
    updatedAt: new Date()
  };

  projects.set(id, updated);
  return updated;
};

export const deleteProjectById = (id: string) => {
  const existing = projects.get(id);
  if (!existing) return null;

  projects.delete(id);
  return existing;
};
