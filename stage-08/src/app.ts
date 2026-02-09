import express, { type Request, type Response, type NextFunction } from "express";
import hbs from "hbs";
import path from "path";

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

// Routes
app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    title: "Home - My App",
    activePage: "home"
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
