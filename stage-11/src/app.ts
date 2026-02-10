import express, { type Request, type Response, type NextFunction } from "express";
import session from "express-session";
import hbs from "hbs";
import path from "path";
import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { prisma } from "./lib/prisma";

const app = express();

// Path configuration
const viewsPath = path.join(__dirname, "view");
const partialsPath = path.join(__dirname, "view/partials");
const publicPath = path.join(__dirname, "../public");
const assetsPath = path.join(__dirname, "../assets");

// View engine setup
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Register partials
hbs.registerPartials(partialsPath);

// Register custom helpers
hbs.registerHelper("currentYear", () => new Date().getFullYear());
hbs.registerHelper("eq", (a: any, b: any) => a === b);
hbs.registerHelper("json", (context: any) => JSON.stringify(context));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session (Auth)
app.use(
  session({
    name: "myapp.sid",
    secret: process.env.SESSION_SECRET ?? "dev-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    }
  })
);

// Expose auth state to views
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = req.session.user ?? null;
  res.locals.isAuthenticated = Boolean(req.session.user);
  next();
});

// Static files
app.use("/public", express.static(publicPath));
app.use("/assets", express.static(assetsPath));

// Health Check
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development"
  });
});

const getSafeNextUrl = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const nextUrl = value.trim();
  if (!nextUrl) return null;
  if (!nextUrl.startsWith("/")) return null;
  if (nextUrl.startsWith("//")) return null;
  return nextUrl;
};

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) return next();
  const nextUrl = encodeURIComponent(req.originalUrl || "/my-project");
  return res.redirect(`/login?next=${nextUrl}`);
};

// Routes
app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Home - My App",
    activePage: "home"
  });
});

app.get("/my-project", requireAuth, (req: Request, res: Response) => {
  res.render("index", {
    title: "My Project - My App",
    activePage: "my-project",
    content: "my-project"
  });
});

app.get("/register", (req: Request, res: Response) => {
  if (req.session.user) return res.redirect("/my-project");

  const nextUrl = getSafeNextUrl(req.query.next) ?? "/my-project";
  res.render("index", {
    title: "Register - My App",
    activePage: "register",
    content: "register",
    nextUrl,
    nextUrlEncoded: encodeURIComponent(nextUrl)
  });
});

app.post("/register", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.user) return res.redirect("/my-project");

    const name = String(req.body?.name ?? "").trim();
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const passwordConfirm = String(req.body?.passwordConfirm ?? "");
    const nextUrl = getSafeNextUrl(req.body?.nextUrl) ?? "/my-project";
    const nextUrlEncoded = encodeURIComponent(nextUrl);

    if (!name || !email || !password) {
      return res.status(400).render("index", {
        title: "Register - My App",
        activePage: "register",
        content: "register",
        error: "Name, email, and password are required.",
        form: { name, email },
        nextUrl,
        nextUrlEncoded
      });
    }

    if (password.length < 6) {
      return res.status(400).render("index", {
        title: "Register - My App",
        activePage: "register",
        content: "register",
        error: "Password must be at least 6 characters.",
        form: { name, email },
        nextUrl,
        nextUrlEncoded
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).render("index", {
        title: "Register - My App",
        activePage: "register",
        content: "register",
        error: "Password confirmation does not match.",
        form: { name, email },
        nextUrl,
        nextUrlEncoded
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true }
    });

    req.session.user = user;
    return res.redirect(nextUrl);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
      const nextUrl = getSafeNextUrl(req.body?.nextUrl) ?? "/my-project";
      const nextUrlEncoded = encodeURIComponent(nextUrl);
      const name = String(req.body?.name ?? "").trim();
      const email = String(req.body?.email ?? "").trim().toLowerCase();
      return res.status(409).render("index", {
        title: "Register - My App",
        activePage: "register",
        content: "register",
        error: "Email is already registered. Please login.",
        form: { name, email },
        nextUrl,
        nextUrlEncoded
      });
    }

    return next(err as Error);
  }
});

app.get("/login", (req: Request, res: Response) => {
  if (req.session.user) return res.redirect("/my-project");

  const nextUrl = getSafeNextUrl(req.query.next) ?? "/my-project";
  res.render("index", {
    title: "Login - My App",
    activePage: "login",
    content: "login",
    nextUrl,
    nextUrlEncoded: encodeURIComponent(nextUrl)
  });
});

app.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.session.user) return res.redirect("/my-project");

    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const password = String(req.body?.password ?? "");
    const nextUrl = getSafeNextUrl(req.body?.nextUrl) ?? "/my-project";
    const nextUrlEncoded = encodeURIComponent(nextUrl);

    if (!email || !password) {
      return res.status(400).render("index", {
        title: "Login - My App",
        activePage: "login",
        content: "login",
        error: "Email and password are required.",
        form: { email },
        nextUrl,
        nextUrlEncoded
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, name: true, email: true, passwordHash: true }
    });

    if (!user) {
      return res.status(401).render("index", {
        title: "Login - My App",
        activePage: "login",
        content: "login",
        error: "Invalid email or password.",
        form: { email },
        nextUrl,
        nextUrlEncoded
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatches) {
      return res.status(401).render("index", {
        title: "Login - My App",
        activePage: "login",
        content: "login",
        error: "Invalid email or password.",
        form: { email },
        nextUrl,
        nextUrlEncoded
      });
    }

    req.session.user = { id: user.id, name: user.name, email: user.email };
    return res.redirect(nextUrl);
  } catch (err) {
    return next(err as Error);
  }
});

app.post("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.session.destroy((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
});

app.get("/about", (req: Request, res: Response) => {
  res.render("index", {
    title: "About - My App",
    activePage: "about",
    content: "about"
  });
});

app.get("/contact", (req: Request, res: Response) => {
  res.render("index", {
    title: "Contact - My App",
    activePage: "contact",
    content: "contact"
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).render("index", {
    title: "404 - Page Not Found",
    content: "not-found"
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).render("index", {
    title: "500 - Server Error",
    content: "error",
    error: process.env.NODE_ENV === "development" ? err.message : "Internal Server Error"
  });
});

export default app;
