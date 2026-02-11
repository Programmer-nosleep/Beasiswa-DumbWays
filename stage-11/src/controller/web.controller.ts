import type { NextFunction, Request, Response } from "express";
import { getSafeNextUrl } from "../lib/url";

export const renderHome = (req: Request, res: Response) => {
  res.render("index", {
    title: "Home - My App",
    activePage: "home"
  });
};

export const renderMyProject = (req: Request, res: Response) => {
  res.render("index", {
    title: "My Project - My App",
    activePage: "my-project",
    content: "my-project"
  });
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

