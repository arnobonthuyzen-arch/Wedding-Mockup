import { cookies } from "next/headers";
import crypto from "crypto";

export const ADMIN_USERNAME = process.env.ADMIN_USER || "0205205114080";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "KoosDoos2026";
const AUTH_SECRET = process.env.ADMIN_SECRET || "cfd-wedding-admin-secret-key-2026-cpa";
export const AUTH_COOKIE_NAME = "cfd_admin_auth";

/**
 * Generate a signed session token: username:timestamp:signature
 */
export function createSessionToken(username: string): string {
  const timestamp = Date.now().toString();
  const data = `${username}:${timestamp}`;
  const hmac = crypto.createHmac("sha256", AUTH_SECRET).update(data).digest("hex");
  return `${data}:${hmac}`;
}

/**
 * Verify a session token. Valid for 7 days.
 */
export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token) return false;

  const parts = token.split(":");
  if (parts.length !== 3) return false;

  const [username, timestamp, signature] = parts;
  if (username !== ADMIN_USERNAME) return false;

  const ageMs = Date.now() - Number(timestamp);
  const maxAgeMs = 7 * 24 * 60 * 60 * 1000; // 7 days
  if (isNaN(ageMs) || ageMs < 0 || ageMs > maxAgeMs) return false;

  const expectedHmac = crypto
    .createHmac("sha256", AUTH_SECRET)
    .update(`${username}:${timestamp}`)
    .digest("hex");

  try {
    return crypto.timingSafeEqual(
      Buffer.from(signature, "hex"),
      Buffer.from(expectedHmac, "hex")
    );
  } catch {
    return false;
  }
}

/**
 * Helper to check current admin request auth from cookies
 */
export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
