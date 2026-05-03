import express from "express";
import nodemailer from "nodemailer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA   = path.join(__dirname, "data", "users.json");
const OUTBOX = path.join(__dirname, "outbox");
fs.mkdirSync(path.dirname(DATA), { recursive: true });
fs.mkdirSync(OUTBOX, { recursive: true });
if (!fs.existsSync(DATA)) fs.writeFileSync(DATA, "[]");

const PORT       = process.env.PORT       || 3001;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}`;
const SITE_URL   = process.env.SITE_URL   || "http://localhost:5500";
const FROM       = process.env.SMTP_FROM  || "1HappyEnd <noreply@1happyend.com>";

const transport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth:   process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
        : undefined
    })
  : null;

const readUsers  = () => JSON.parse(fs.readFileSync(DATA, "utf8"));
const writeUsers = u  => fs.writeFileSync(DATA, JSON.stringify(u, null, 2));
const sha256     = s  => crypto.createHash("sha256").update(s).digest("hex");
const mkToken    = () => crypto.randomBytes(24).toString("hex");
const mkCode     = () => String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");

// ─── Email templates ─────────────────────────────────────────────────────────
// lang defaults to "en". Add more keys to each template for future i18n.
const tpl = {
  base: (body) => `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>1HappyEnd</title>
<style>
  body{margin:0;padding:0;background:#f4f4f5;font-family:Inter,Arial,sans-serif}
  .wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,.08)}
  .head{background:#1a1a2e;padding:28px 32px;text-align:center}
  .head img{height:40px}
  .head h1{color:#fff;font-size:20px;margin:12px 0 0;letter-spacing:.5px}
  .body{padding:32px}
  .body p{color:#444;font-size:15px;line-height:1.6;margin:0 0 16px}
  .body strong{color:#1a1a2e}
  .code-box{background:#f4f4f5;border-radius:10px;padding:20px;text-align:center;margin:24px 0}
  .code-box span{font-size:36px;font-weight:700;letter-spacing:12px;color:#df2f45;font-family:monospace}
  .btn{display:inline-block;background:#df2f45;color:#fff!important;text-decoration:none;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:600;margin:20px 0}
  .note{font-size:13px;color:#999;margin-top:24px;padding-top:16px;border-top:1px solid #eee}
  .foot{background:#f9f9f9;padding:20px 32px;text-align:center}
  .foot p{color:#aaa;font-size:12px;margin:0}
  .foot a{color:#aaa;text-decoration:none}
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <h1>1HappyEnd</h1>
  </div>
  <div class="body">${body}</div>
  <div class="foot">
    <p>© 2007–2026 1HappyEnd · All rights reserved</p>
    <p style="margin-top:6px"><a href="${SITE_URL}">Visit 1HappyEnd</a> · <a href="${SITE_URL}/privacy">Privacy</a> · <a href="${SITE_URL}/terms">Terms</a></p>
  </div>
</div>
</body>
</html>`,

  verify: ({ name, link, lang = "en" }) => {
    const copy = {
      en: {
        subject: "Confirm your email address – 1HappyEnd",
        hi: `Hi ${name},`,
        p1: "Thanks for registering on 1HappyEnd. Please confirm your email address by clicking the button below.",
        btn: "Confirm email address",
        p2: "This link is valid for <strong>24 hours</strong>. If you did not create an account, you can safely ignore this email.",
        note: `Or copy this link into your browser:<br><a href="${link}" style="color:#df2f45;word-break:break-all">${link}</a>`
      },
      nl: {
        subject: "Bevestig je e-mailadres – 1HappyEnd",
        hi: `Hoi ${name},`,
        p1: "Bedankt voor je registratie op 1HappyEnd. Bevestig je e-mailadres door op de knop hieronder te klikken.",
        btn: "E-mailadres bevestigen",
        p2: "Deze link is <strong>24 uur</strong> geldig. Als jij dit account niet hebt aangemaakt, kun je deze e-mail negeren.",
        note: `Of kopieer deze link naar je browser:<br><a href="${link}" style="color:#df2f45;word-break:break-all">${link}</a>`
      }
    };
    const c = copy[lang] || copy.en;
    return {
      subject: c.subject,
      html: tpl.base(`
        <p>${c.hi}</p>
        <p>${c.p1}</p>
        <p style="text-align:center"><a class="btn" href="${link}">${c.btn}</a></p>
        <p>${c.p2}</p>
        <p class="note">${c.note}</p>
      `)
    };
  },

  loginCode: ({ name, code, lang = "en" }) => {
    const copy = {
      en: {
        subject: `${code} is your 1HappyEnd login code`,
        hi: `Hi ${name},`,
        p1: "Use the verification code below to complete your sign-in.",
        label: "Your login code",
        p2: "This code is valid for <strong>10 minutes</strong> and can only be used once.",
        note: "If you did not request this code, please change your password immediately."
      },
      nl: {
        subject: `${code} is jouw 1HappyEnd inlogcode`,
        hi: `Hoi ${name},`,
        p1: "Gebruik de onderstaande verificatiecode om je inlog te voltooien.",
        label: "Jouw inlogcode",
        p2: "Deze code is <strong>10 minuten</strong> geldig en kan slechts één keer worden gebruikt.",
        note: "Als jij deze code niet hebt aangevraagd, wijzig dan direct je wachtwoord."
      }
    };
    const c = copy[lang] || copy.en;
    return {
      subject: c.subject,
      html: tpl.base(`
        <p>${c.hi}</p>
        <p>${c.p1}</p>
        <div class="code-box">
          <p style="margin:0 0 8px;font-size:13px;color:#888">${c.label}</p>
          <span>${code}</span>
        </div>
        <p>${c.p2}</p>
        <p class="note">${c.note}</p>
      `)
    };
  }
};

// ─── Mail helper ─────────────────────────────────────────────────────────────
async function sendMail(to, subject, html) {
  if (transport) {
    return transport.sendMail({ from: FROM, to, subject, html });
  }
  const file = path.join(OUTBOX, `${Date.now()}-${to.replace(/[^a-z0-9]/gi, "_")}.eml`);
  fs.writeFileSync(file, `From: ${FROM}\nTo: ${to}\nSubject: ${subject}\nContent-Type: text/html\n\n${html}\n`);
  console.log(`[mail-stub] ${to} :: ${subject} -> ${file}`);
}

// ─── App ─────────────────────────────────────────────────────────────────────
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// POST /api/signup
app.post("/api/signup", async (req, res) => {
  const { username, email, password, role = "visitor", name = "", lang = "en" } = req.body || {};
  if (!username || !email || !password) return res.status(400).json({ error: "missing" });

  const users = readUsers();
  if (users.find(u => u.username === username || u.email === email))
    return res.status(409).json({ error: "exists" });

  const verifyToken = mkToken();
  users.push({
    username, email, name: name || username, role,
    pwHash: sha256(password),
    emailVerified: false,
    verifyToken,
    loginCode: null,
    loginCodeExp: 0,
    createdAt: Date.now()
  });
  writeUsers(users);

  const link = `${SITE_URL}/verify/?token=${verifyToken}`;
  const { subject, html } = tpl.verify({ name: name || username, link, lang });
  await sendMail(email, subject, html);

  res.json({ ok: true, link: transport ? undefined : link });
});

// GET /api/verify?token=xxx
app.get("/api/verify", (req, res) => {
  const { token: t } = req.query;
  const users = readUsers();
  const u = users.find(x => x.verifyToken === t);
  if (!u) return res.status(404).json({ error: "invalid" });
  u.emailVerified = true;
  u.verifyToken = null;
  writeUsers(users);
  res.json({ ok: true, username: u.username });
});

// POST /api/login  — password check → always send 6-digit code (kinky.nl style)
app.post("/api/login", async (req, res) => {
  const { username, password, lang = "en" } = req.body || {};
  const users = readUsers();
  const u = users.find(x =>
    (x.username === username || x.email === username) && x.pwHash === sha256(password)
  );
  if (!u) return res.status(401).json({ error: "credentials" });
  if (!u.emailVerified) return res.status(403).json({ error: "unverified" });

  // Always generate a fresh code on every login
  u.loginCode    = mkCode();
  u.loginCodeExp = Date.now() + 10 * 60 * 1000;
  writeUsers(users);

  const { subject, html } = tpl.loginCode({ name: u.name || u.username, code: u.loginCode, lang });
  await sendMail(u.email, subject, html);

  res.json({ requiresCode: true, devCode: transport ? undefined : u.loginCode });
});

// POST /api/login-code
app.post("/api/login-code", (req, res) => {
  const { username, code } = req.body || {};
  const users = readUsers();
  const u = users.find(x => x.username === username || x.email === username);
  if (!u || !u.loginCode)      return res.status(400).json({ error: "no-code" });
  if (Date.now() > u.loginCodeExp) return res.status(400).json({ error: "expired" });
  if (u.loginCode !== String(code).trim()) return res.status(401).json({ error: "wrong-code" });

  u.loginCode    = null;
  u.loginCodeExp = 0;
  writeUsers(users);

  res.json({ ok: true, user: { username: u.username, role: u.role, name: u.name, email: u.email } });
});

app.listen(PORT, () => console.log(`1HappyEnd API  :${PORT}  public=${PUBLIC_URL}  site=${SITE_URL}`));
