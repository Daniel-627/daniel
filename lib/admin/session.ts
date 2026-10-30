import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secret(): string | null {
  const s = process.env.ADMIN_SESSION_SECRET;
  return s && s.length >= 32 ? s : null;
}

function sign(value: string, key: string) {
  return createHmac("sha256", key).update(value).digest("hex");
}

/** Token format: "<expiryMs>.<hmac>". Stateless, signed, expires. */
export function signSession(now = Date.now()): string {
  const key = secret();
  if (!key) throw new Error("ADMIN_SESSION_SECRET must be set (32+ characters)");
  const exp = String(now + SESSION_MAX_AGE_SECONDS * 1000);
  return `${exp}.${sign(exp, key)}`;
}

export function verifySession(token: string | undefined, now = Date.now()): boolean {
  const key = secret();
  if (!key || !token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || !/^\d+$/.test(exp)) return false;
  if (Number(exp) < now) return false;
  const expected = sign(exp, key);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Constant-time password check (compares fixed-length digests). */
export function passwordMatches(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || !input) return false;
  const a = createHash("sha256").update(input).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}
