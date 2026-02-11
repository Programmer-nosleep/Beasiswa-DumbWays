import { Router } from "express";
import {
  handleLogin,
  handleCreateProject,
  handleDeleteProject,
  handleRegister,
  renderAbout,
  renderContact,
  renderHome,
  renderLogin,
  renderMyProject,
  renderNewProject,
  renderEditProject,
  renderProjectDetail,
  handleUpdateProject,
  renderRegister
} from "../controller/web.controller";

export const webRouter = Router();

webRouter.get("/", renderHome);
webRouter.get("/my-project", renderMyProject);
webRouter.get("/my-project/new", renderNewProject);
webRouter.post("/my-project", handleCreateProject);
webRouter.get("/my-project/:id/edit", renderEditProject);
webRouter.get("/my-project/:id", renderProjectDetail);
webRouter.post("/my-project/:id", handleUpdateProject);
webRouter.post("/my-project/:id/delete", handleDeleteProject);
webRouter.get("/about", renderAbout);
webRouter.get("/contact", renderContact);

webRouter.get("/login", renderLogin);
webRouter.post("/login", handleLogin);
webRouter.get("/register", renderRegister);
webRouter.post("/register", handleRegister);
