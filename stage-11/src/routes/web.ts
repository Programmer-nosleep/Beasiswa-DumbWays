import { Router } from "express";
import {
  handleLogin,
  handleRegister,
  renderAbout,
  renderContact,
  renderHome,
  renderLogin,
  renderMyProject,
  renderRegister
} from "../controller/web.controller";

export const webRouter = Router();

webRouter.get("/", renderHome);
webRouter.get("/my-project", renderMyProject);
webRouter.get("/about", renderAbout);
webRouter.get("/contact", renderContact);

webRouter.get("/login", renderLogin);
webRouter.post("/login", handleLogin);
webRouter.get("/register", renderRegister);
webRouter.post("/register", handleRegister);

