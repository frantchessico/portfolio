import dotenv from "dotenv";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fs from "fs";
import { MongoClient, type Collection } from "mongodb";
import path from "path";
import { Resend } from "resend";
import { fileURLToPath } from "url";

type Locale = "en" | "pt-BR";
type ValidationField = "name" | "email" | "projectType" | "message";
type CvLeadValidationField = "email";

interface SubmissionLocation {
  ip: string;
  city: string;
  region: string;
  country: string;
  countryCode: string;
}

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  projectType?: unknown;
  message?: unknown;
  locale?: unknown;
  source?: unknown;
}

interface ContactSubmissionPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  message: string;
  locale: Locale;
  userAgent: string;
  source: string;
  location: SubmissionLocation;
  createdAt: Date;
}

interface ContactSubmissionRecord extends ContactSubmissionPayload {
  status: "pending_email" | "email_sent";
  confirmationEmailSentAt?: Date;
}

interface CvDownloadRequestBody {
  email?: unknown;
  locale?: unknown;
  source?: unknown;
}

interface CvDownloadLeadPayload {
  email: string;
  locale: Locale;
  source: string;
  userAgent: string;
  location: SubmissionLocation;
  createdAt: Date;
}

interface CvDownloadLeadRecord extends CvDownloadLeadPayload {
  status: "pending_email" | "email_sent";
  confirmationEmailSentAt?: Date;
}

interface ConfirmationContent {
  subject: string;
  html: string;
  text: string;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serverRoot = path.resolve(__dirname, "..");
const workspaceRoot = path.resolve(serverRoot, "..");
const clientDistDir = path.resolve(workspaceRoot, "dist/public");
const clientIndexHtmlPath = path.join(clientDistDir, "index.html");

dotenv.config({ path: path.resolve(serverRoot, ".env") });

const apiPortRaw =
  process.env.API_PORT ??
  (process.env.NODE_ENV === "production" ? process.env.PORT : undefined) ??
  "8787";
const apiPort = Number(apiPortRaw);

if (Number.isNaN(apiPort) || apiPort <= 0) {
  throw new Error(`Invalid API port: "${apiPortRaw}"`);
}

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB_NAME ?? "portfolio";
const mongoCollectionName =
  process.env.MONGODB_COLLECTION_NAME ?? "contact_submissions";
const mongoCvCollectionName =
  process.env.MONGODB_CV_COLLECTION_NAME ?? "cv_download_leads";
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail =
  process.env.RESEND_FROM_EMAIL ??
  "Francisco Inoque <hello@franciscoinoque.site>";
const adminNotificationEmail =
  process.env.ADMIN_NOTIFICATION_EMAIL ?? "jaimeinoque20@gmail.com";
const corsAllowedOrigins = (
  process.env.CORS_ALLOWED_ORIGINS ??
  "http://localhost:3000,http://127.0.0.1:3000"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);
const siteUrl =
  process.env.SITE_URL ??
  "https://savanapoint-francisco-inoque.kwbhel.easypanel.host/";
const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

let mongoClientPromise: Promise<MongoClient> | undefined;

function readTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function readHeaderValue(req: Request, name: string): string {
  const value = req.headers[name];

  if (Array.isArray(value)) {
    return value[0]?.trim() ?? "";
  }

  return typeof value === "string" ? value.trim() : "";
}

function readForwardedIp(req: Request): string {
  const forwarded = readHeaderValue(req, "x-forwarded-for");

  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "";
  }

  return "";
}

function normalizeLocationValue(value: string, fallback = "Unknown"): string {
  return value.trim() || fallback;
}

function getCountryNameFromCode(countryCode: string): string {
  const normalizedCode = countryCode.trim().toUpperCase();

  if (!/^[A-Z]{2}$/.test(normalizedCode) || normalizedCode === "XX") {
    return "Unknown";
  }

  try {
    return countryNames.of(normalizedCode) ?? normalizedCode;
  } catch {
    return "Unknown";
  }
}

function isAllowedOrigin(origin: string): boolean {
  if (!origin) {
    return false;
  }

  if (corsAllowedOrigins.includes(origin)) {
    return true;
  }

  try {
    const { hostname } = new URL(origin);

    return hostname.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

function applyCors(req: Request, res: Response): void {
  const origin = readHeaderValue(req, "origin");

  if (!isAllowedOrigin(origin)) {
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function resolveLocation(req: Request): SubmissionLocation {
  const rawCountryCode =
    readHeaderValue(req, "x-vercel-ip-country") ||
    readHeaderValue(req, "cf-ipcountry") ||
    readHeaderValue(req, "x-country-code");
  const normalizedCountryCode = rawCountryCode.trim().toUpperCase();
  const countryCode = /^[A-Z]{2}$/.test(normalizedCountryCode)
    ? normalizedCountryCode
    : "Unknown";
  const city = normalizeLocationValue(
    readHeaderValue(req, "x-vercel-ip-city") ||
      readHeaderValue(req, "cf-ipcity") ||
      readHeaderValue(req, "x-city"),
  );
  const region = normalizeLocationValue(
    readHeaderValue(req, "x-vercel-ip-country-region") ||
      readHeaderValue(req, "cf-region") ||
      readHeaderValue(req, "x-region"),
  );
  const ip = normalizeLocationValue(
    readForwardedIp(req) ||
      readHeaderValue(req, "x-real-ip") ||
      req.ip ||
      "",
  );

  return {
    ip,
    city,
    region,
    countryCode,
    country: getCountryNameFromCode(countryCode),
  };
}

function getMongoClient(): Promise<MongoClient> {
  if (!mongoUri) {
    throw new Error("Missing MONGODB_URI environment variable.");
  }

  if (!mongoClientPromise) {
    mongoClientPromise = new MongoClient(mongoUri).connect();
  }

  if (!mongoClientPromise) {
    throw new Error("Failed to initialize MongoDB client.");
  }

  return mongoClientPromise;
}

function getCollection(client: MongoClient): Collection<ContactSubmissionRecord> {
  return client.db(mongoDbName).collection<ContactSubmissionRecord>(
    mongoCollectionName,
  );
}

function getCvLeadCollection(client: MongoClient): Collection<CvDownloadLeadRecord> {
  return client.db(mongoDbName).collection<CvDownloadLeadRecord>(
    mongoCvCollectionName,
  );
}

function getResendClient(): Resend {
  if (!resendApiKey) {
    throw new Error("Missing RESEND_API_KEY environment variable.");
  }

  return new Resend(resendApiKey);
}

function escapeHtml(value: unknown): string {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildAdminEmailHtml(submission: ContactSubmissionPayload): string {
  const rows = [
    ["Name", submission.name],
    ["Email", submission.email],
    ["Company", submission.company || "Not provided"],
    ["Project type", submission.projectType],
    ["Locale", submission.locale],
    ["Country", submission.location.country],
    ["Region", submission.location.region],
    ["City", submission.location.city],
    ["IP", submission.location.ip],
    ["Submitted at", submission.createdAt.toLocaleString("en-US")],
  ] as const;

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;font-weight:600;border:1px solid #e5e7eb;background:#f8fafc;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f4;padding:24px;color:#111827;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:20px;padding:32px;">
        <h1 style="margin:0 0 16px;font-size:24px;">New portfolio contact submission</h1>
        <p style="margin:0 0 24px;color:#57534e;">A new lead was submitted through ${escapeHtml(siteUrl)}.</p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">${tableRows}</table>
        <div style="padding:18px 20px;border-radius:18px;background:#0c0a09;color:#fafaf9;">
          <h2 style="margin:0 0 10px;font-size:16px;">Project details</h2>
          <p style="margin:0;white-space:pre-wrap;line-height:1.7;color:#e7e5e4;">${escapeHtml(submission.message)}</p>
        </div>
      </div>
    </div>
  `;
}

function buildAdminEmailText(submission: ContactSubmissionPayload): string {
  return [
    "New portfolio contact submission",
    "",
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Company: ${submission.company || "Not provided"}`,
    `Project type: ${submission.projectType}`,
    `Locale: ${submission.locale}`,
    `Country: ${submission.location.country}`,
    `Region: ${submission.location.region}`,
    `City: ${submission.location.city}`,
    `IP: ${submission.location.ip}`,
    `Submitted at: ${submission.createdAt.toISOString()}`,
    "",
    "Project details:",
    submission.message,
  ].join("\n");
}

function buildConfirmationContent(
  submission: ContactSubmissionPayload,
): ConfirmationContent {
  const isPortuguese = submission.locale === "pt-BR";

  if (isPortuguese) {
    return {
      subject: "Recebemos a sua mensagem",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f4;padding:24px;color:#111827;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:20px;padding:32px;">
            <h1 style="margin:0 0 16px;font-size:24px;">Mensagem recebida, ${escapeHtml(submission.name)}.</h1>
            <p style="margin:0 0 16px;line-height:1.7;color:#57534e;">
              Obrigado por entrar em contato. Sua mensagem foi registrada e vou responder pelo email <strong>${escapeHtml(submission.email)}</strong> assim que possível.
            </p>
            <div style="padding:18px 20px;border-radius:18px;background:#fff7ed;border:1px solid #fdba74;margin:20px 0;">
              <p style="margin:0 0 8px;font-weight:600;">Resumo enviado</p>
              <p style="margin:0;color:#7c2d12;"><strong>Tipo de projeto:</strong> ${escapeHtml(submission.projectType)}</p>
              <p style="margin:8px 0 0;color:#7c2d12;"><strong>Mensagem:</strong> ${escapeHtml(submission.message)}</p>
            </div>
            <p style="margin:0;color:#57534e;">Francisco Inoque</p>
          </div>
        </div>
      `,
      text: [
        `Mensagem recebida, ${submission.name}.`,
        "",
        "Obrigado por entrar em contato. Sua mensagem foi registrada e vou responder assim que possível.",
        "",
        `Tipo de projeto: ${submission.projectType}`,
        `Mensagem: ${submission.message}`,
        "",
        "Francisco Inoque",
      ].join("\n"),
    };
  }

  return {
    subject: "We received your message",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f4;padding:24px;color:#111827;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:20px;padding:32px;">
          <h1 style="margin:0 0 16px;font-size:24px;">Message received, ${escapeHtml(submission.name)}.</h1>
          <p style="margin:0 0 16px;line-height:1.7;color:#57534e;">
            Thanks for reaching out. Your message has been recorded and I'll reply to <strong>${escapeHtml(submission.email)}</strong> as soon as possible.
          </p>
          <div style="padding:18px 20px;border-radius:18px;background:#fff7ed;border:1px solid #fdba74;margin:20px 0;">
            <p style="margin:0 0 8px;font-weight:600;">Submission summary</p>
            <p style="margin:0;color:#7c2d12;"><strong>Project type:</strong> ${escapeHtml(submission.projectType)}</p>
            <p style="margin:8px 0 0;color:#7c2d12;"><strong>Message:</strong> ${escapeHtml(submission.message)}</p>
          </div>
          <p style="margin:0;color:#57534e;">Francisco Inoque</p>
        </div>
      </div>
    `,
    text: [
      `Message received, ${submission.name}.`,
      "",
      "Thanks for reaching out. Your message has been recorded and I'll reply as soon as possible.",
      "",
      `Project type: ${submission.projectType}`,
      `Message: ${submission.message}`,
      "",
      "Francisco Inoque",
    ].join("\n"),
  };
}

function buildCvLeadAdminEmailHtml(lead: CvDownloadLeadPayload): string {
  const rows = [
    ["Email", lead.email],
    ["Locale", lead.locale],
    ["Country", lead.location.country],
    ["Region", lead.location.region],
    ["City", lead.location.city],
    ["IP", lead.location.ip],
    ["Submitted at", lead.createdAt.toLocaleString("en-US")],
    ["Source", lead.source],
  ] as const;

  const tableRows = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:10px 12px;font-weight:600;border:1px solid #e5e7eb;background:#f8fafc;">${escapeHtml(label)}</td>
          <td style="padding:10px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td>
        </tr>
      `,
    )
    .join("");

  return `
    <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f4;padding:24px;color:#111827;">
      <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:20px;padding:32px;">
        <h1 style="margin:0 0 16px;font-size:24px;">New CV download lead</h1>
        <p style="margin:0 0 24px;color:#57534e;">A visitor requested Francisco Inoque's CV.</p>
        <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
      </div>
    </div>
  `;
}

function buildCvLeadAdminEmailText(lead: CvDownloadLeadPayload): string {
  return [
    "New CV download lead",
    "",
    `Email: ${lead.email}`,
    `Locale: ${lead.locale}`,
    `Country: ${lead.location.country}`,
    `Region: ${lead.location.region}`,
    `City: ${lead.location.city}`,
    `IP: ${lead.location.ip}`,
    `Source: ${lead.source}`,
    `Submitted at: ${lead.createdAt.toISOString()}`,
  ].join("\n");
}

function buildCvConfirmationContent(lead: CvDownloadLeadPayload): ConfirmationContent {
  const cvUrl = new URL("francisco-inoque-cv.pdf", siteUrl).toString();

  if (lead.locale === "pt-BR") {
    return {
      subject: "Seu CV está pronto para download",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f4;padding:24px;color:#111827;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:20px;padding:32px;">
            <h1 style="margin:0 0 16px;font-size:24px;">Obrigado pelo interesse.</h1>
            <p style="margin:0 0 16px;line-height:1.7;color:#57534e;">
              Recebemos o seu pedido de CV. Você pode baixar o arquivo pelo botão abaixo sempre que precisar.
            </p>
            <a href="${escapeHtml(cvUrl)}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#fd6a14;color:#fff7ed;text-decoration:none;font-weight:600;">Baixar CV</a>
            <p style="margin:20px 0 0;color:#57534e;">Francisco Inoque</p>
          </div>
        </div>
      `,
      text: [
        "Obrigado pelo interesse.",
        "",
        "Recebemos o seu pedido de CV.",
        `Baixar CV: ${cvUrl}`,
        "",
        "Francisco Inoque",
      ].join("\n"),
    };
  }

  return {
    subject: "Your CV download is ready",
    html: `
      <div style="font-family:Inter,Arial,sans-serif;background:#f5f5f4;padding:24px;color:#111827;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7e5e4;border-radius:20px;padding:32px;">
          <h1 style="margin:0 0 16px;font-size:24px;">Thanks for your interest.</h1>
          <p style="margin:0 0 16px;line-height:1.7;color:#57534e;">
            We received your CV request. You can download the file any time using the button below.
          </p>
          <a href="${escapeHtml(cvUrl)}" style="display:inline-block;padding:14px 22px;border-radius:999px;background:#fd6a14;color:#fff7ed;text-decoration:none;font-weight:600;">Download CV</a>
          <p style="margin:20px 0 0;color:#57534e;">Francisco Inoque</p>
        </div>
      </div>
    `,
    text: [
      "Thanks for your interest.",
      "",
      "We received your CV request.",
      `Download CV: ${cvUrl}`,
      "",
      "Francisco Inoque",
    ].join("\n"),
  };
}

function ensureConfig(): string[] {
  const missing: string[] = [];

  if (!mongoUri) {
    missing.push("MONGODB_URI");
  }

  if (!resendApiKey) {
    missing.push("RESEND_API_KEY");
  }

  return missing;
}

function createPayload(req: Request): ContactSubmissionPayload {
  const body = (req.body ?? {}) as ContactRequestBody;

  return {
    name: readTrimmedString(body.name),
    email: readTrimmedString(body.email),
    company: readTrimmedString(body.company),
    projectType: readTrimmedString(body.projectType),
    message: readTrimmedString(body.message),
    locale: body.locale === "pt-BR" ? "pt-BR" : "en",
    userAgent:
      typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : "",
    source:
      typeof body.source === "string" && body.source.trim()
        ? body.source.trim()
        : "portfolio",
    location: resolveLocation(req),
    createdAt: new Date(),
  };
}

function createCvLeadPayload(req: Request): CvDownloadLeadPayload {
  const body = (req.body ?? {}) as CvDownloadRequestBody;

  return {
    email: readTrimmedString(body.email),
    locale: body.locale === "pt-BR" ? "pt-BR" : "en",
    userAgent:
      typeof req.headers["user-agent"] === "string" ? req.headers["user-agent"] : "",
    source:
      typeof body.source === "string" && body.source.trim()
        ? body.source.trim()
        : "portfolio_cv_download",
    location: resolveLocation(req),
    createdAt: new Date(),
  };
}

function validatePayload(payload: ContactSubmissionPayload): ValidationField[] {
  const validationErrors: ValidationField[] = [];

  if (!payload.name) {
    validationErrors.push("name");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    validationErrors.push("email");
  }

  if (!payload.projectType) {
    validationErrors.push("projectType");
  }

  if (payload.message.length < 12) {
    validationErrors.push("message");
  }

  return validationErrors;
}

function validateCvLeadPayload(payload: CvDownloadLeadPayload): CvLeadValidationField[] {
  const validationErrors: CvLeadValidationField[] = [];

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    validationErrors.push("email");
  }

  return validationErrors;
}

function createApp() {
  const app = express();

  app.set("trust proxy", true);
  app.use((req: Request, res: Response, next: NextFunction) => {
    applyCors(req, res);

    if (req.method === "OPTIONS") {
      return res.status(204).end();
    }

    return next();
  });
  app.use(express.json({ limit: "1mb" }));

  app.get("/api/health", (_req: Request, res: Response) => {
    const missing = ensureConfig();

    res.json({
      ok: missing.length === 0,
      missing,
      mongoDbName,
      mongoCollectionName,
      mongoCvCollectionName,
      adminNotificationEmail,
    });
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    const missing = ensureConfig();

    if (missing.length > 0) {
      return res.status(503).json({
        ok: false,
        message:
          "Contact service is not configured yet. Missing environment variables.",
        missing,
      });
    }

    const payload = createPayload(req);
    const validationErrors = validatePayload(payload);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Validation failed.",
        fields: validationErrors,
      });
    }

    try {
      const client = await getMongoClient();
      const collection = getCollection(client);
      const submissionRecord: ContactSubmissionRecord = {
        ...payload,
        status: "pending_email",
      };
      const insertResult = await collection.insertOne(submissionRecord);
      const resend = getResendClient();
      const confirmation = buildConfirmationContent(payload);

      await Promise.all([
        resend.emails.send({
          from: resendFromEmail,
          to: adminNotificationEmail,
          subject: `New portfolio lead: ${payload.projectType} (${payload.name})`,
          html: buildAdminEmailHtml(payload),
          text: buildAdminEmailText(payload),
          replyTo: payload.email,
        }),
        resend.emails.send({
          from: resendFromEmail,
          to: payload.email,
          subject: confirmation.subject,
          html: confirmation.html,
          text: confirmation.text,
          replyTo: "hello@franciscoinoque.site",
        }),
      ]);

      await collection.updateOne(
        { _id: insertResult.insertedId },
        {
          $set: {
            status: "email_sent",
            confirmationEmailSentAt: new Date(),
          },
        },
      );

      return res.status(201).json({
        ok: true,
        message: "Submission stored and emails sent.",
      });
    } catch (error) {
      console.error("Contact submission failed:", error);

      return res.status(500).json({
        ok: false,
        message: "Failed to submit contact form.",
      });
    }
  });

  app.post("/api/cv-download", async (req: Request, res: Response) => {
    const missing = ensureConfig();

    if (missing.length > 0) {
      return res.status(503).json({
        ok: false,
        message: "CV lead service is not configured yet. Missing environment variables.",
        missing,
      });
    }

    const payload = createCvLeadPayload(req);
    const validationErrors = validateCvLeadPayload(payload);

    if (validationErrors.length > 0) {
      return res.status(400).json({
        ok: false,
        message: "Validation failed.",
        fields: validationErrors,
      });
    }

    try {
      const client = await getMongoClient();
      const collection = getCvLeadCollection(client);
      const leadRecord: CvDownloadLeadRecord = {
        ...payload,
        status: "pending_email",
      };
      const insertResult = await collection.insertOne(leadRecord);
      const resend = getResendClient();
      const confirmation = buildCvConfirmationContent(payload);

      await Promise.all([
        resend.emails.send({
          from: resendFromEmail,
          to: adminNotificationEmail,
          subject: `New CV lead (${payload.email})`,
          html: buildCvLeadAdminEmailHtml(payload),
          text: buildCvLeadAdminEmailText(payload),
          replyTo: payload.email,
        }),
        resend.emails.send({
          from: resendFromEmail,
          to: payload.email,
          subject: confirmation.subject,
          html: confirmation.html,
          text: confirmation.text,
          replyTo: "hello@franciscoinoque.site",
        }),
      ]);

      await collection.updateOne(
        { _id: insertResult.insertedId },
        {
          $set: {
            status: "email_sent",
            confirmationEmailSentAt: new Date(),
          },
        },
      );

      return res.status(201).json({
        ok: true,
        message: "CV lead stored and emails sent.",
      });
    } catch (error) {
      console.error("CV download lead failed:", error);

      return res.status(500).json({
        ok: false,
        message: "Failed to process CV download request.",
      });
    }
  });

  if (process.env.NODE_ENV !== "development" && fs.existsSync(clientIndexHtmlPath)) {
    app.use(express.static(clientDistDir));

    app.get(
      "/{*path}",
      (req: Request, res: Response, next: NextFunction) => {
        if (req.path.startsWith("/api/")) {
          return next();
        }

        return res.sendFile(clientIndexHtmlPath);
      },
    );
  }

  return app;
}

const app = createApp();

app.listen(apiPort, "0.0.0.0", () => {
  console.log(`Contact server listening on http://0.0.0.0:${apiPort}`);
});
