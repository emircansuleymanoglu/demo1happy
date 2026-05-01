import express from "express";
import nodemailer from "nodemailer";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(__dirname, "data", "users.json");
const OUTBOX = path.join(__dirname, "outbox");
fs.mkdirSync(path.dirname(DATA), { recursive: true });
fs.mkdirSync(OUTBOX, { recursive: true });
if (!fs.existsSync(DATA)) fs.writeFileSync(DATA, "[]");

const PORT = process.env.PORT || 3001;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:${PORT}`;
const FROM = process.env.SMTP_FROM || "1HappyEnd <noreply@1happyend.local>";

const transport = process.env.SMTP_HOST
  ? nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined
    })
  : null;

const readUsers = () => JSON.parse(fs.readFileSync(DATA, "utf8"));
const writeUsers = u => fs.writeFileSync(DATA, JSON.stringify(u, null, 2));
const hash = s => crypto.createHash("sha256").update(s).digest("hex");
const token = () => crypto.randomBytes(24).toString("hex");
const code6 = () => String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");

async function sendMail(to, subject, html) {
  if (transport) return transport.sendMail({ from: FROM, to, subject, html });
  const file = path.join(OUTBOX, `${Date.now()}-${to.replace(/[^a-z0-9]/gi, "_")}.eml`);
  fs.writeFileSync(file, `From: ${FROM}\nTo: ${to}\nSubject: ${subject}\nContent-Type: text/html\n\n${html}\n`);
  console.log(`[mail-stub] ${to} :: ${subject} -> ${file}`);
}

const app = express();
app.use(express.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.post("/api/signup", async (req, res) => {
  const { username, email, password, role = "visitor", name = "" } = req.body || {};
  if (!username || !email || !password) return res.status(400).json({ error: "missing" });
  const users = readUsers();
  if (users.find(u => u.username === username || u.email === email)) return res.status(409).json({ error: "exists" });
  const verifyToken = token();
  users.push({
    username, email, name, role,
    pwHash: hash(password),
    emailVerified: false,
    firstLoginDone: false,
    verifyToken,
    loginCode: null,
    loginCodeExp: 0,
    createdAt: Date.now()
  });
  writeUsers(users);
  const link = `${PUBLIC_URL}/verify/?token=${verifyToken}`;
  await sendMail(email, "1HappyEnd e-posta doğrulama",
    `<p>Merhaba ${name || username},</p><p>Aşağıdaki bağlantıya tıklayarak e-posta adresinizi doğrulayın:</p><p><a href="${link}">${link}</a></p>`);
  res.json({ ok: true, link: transport ? undefined : link });
});

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

app.post("/api/login", async (req, res) => {
  const { username, password } = req.body || {};
  const users = readUsers();
  const u = users.find(x => (x.username === username || x.email === username) && x.pwHash === hash(password));
  if (!u) return res.status(401).json({ error: "credentials" });
  if (!u.emailVerified) return res.status(403).json({ error: "unverified" });
  if (!u.firstLoginDone) {
    u.loginCode = code6();
    u.loginCodeExp = Date.now() + 10 * 60 * 1000;
    writeUsers(users);
    await sendMail(u.email, "1HappyEnd giriş kodu",
      `<p>Tek seferlik giriş kodunuz: <b style="font-size:20px">${u.loginCode}</b></p><p>10 dakika geçerli.</p>`);
    return res.json({ requiresCode: true, devCode: transport ? undefined : u.loginCode });
  }
  res.json({ ok: true, user: { username: u.username, role: u.role, name: u.name, email: u.email } });
});

app.post("/api/login-code", (req, res) => {
  const { username, code } = req.body || {};
  const users = readUsers();
  const u = users.find(x => x.username === username || x.email === username);
  if (!u || !u.loginCode) return res.status(400).json({ error: "no-code" });
  if (Date.now() > u.loginCodeExp) return res.status(400).json({ error: "expired" });
  if (u.loginCode !== String(code).trim()) return res.status(401).json({ error: "wrong-code" });
  u.firstLoginDone = true;
  u.loginCode = null;
  u.loginCodeExp = 0;
  writeUsers(users);
  res.json({ ok: true, user: { username: u.username, role: u.role, name: u.name, email: u.email } });
});

app.listen(PORT, () => console.log(`1HappyEnd API on :${PORT}`));
