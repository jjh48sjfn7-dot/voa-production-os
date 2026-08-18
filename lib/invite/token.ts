import { createHash, randomBytes } from "node:crypto";

const RAW_TOKEN_BYTES = 32;
const HASH_HEX_PATTERN = /^[0-9a-f]{64}$/;
const BASE64URL_PATTERN = /^[A-Za-z0-9_-]+$/;

export function generateInviteToken(): string {
  return randomBytes(RAW_TOKEN_BYTES).toString("base64url");
}

export function isRawInviteToken(value: string): boolean {
  if (!BASE64URL_PATTERN.test(value)) return false;
  const bytes = Buffer.from(value, "base64url");
  return bytes.length === RAW_TOKEN_BYTES;
}

export function hashInviteToken(rawToken: string): string {
  return createHash("sha256").update(rawToken).digest("hex");
}

/**
 * PostgREST JSON bytea input: PostgreSQL hex format `\x` + 64 lowercase hex.
 * Matches `decode(hashHex, 'hex')` used by Migration 4 RPCs.
 * Do not pass Buffer/Uint8Array — JSON.stringify would corrupt bytea.
 */
export function toPgByteaHexLiteral(hashHex: string): string {
  if (!HASH_HEX_PATTERN.test(hashHex)) {
    throw new Error("invalid_invite_token_hash");
  }
  return `\\x${hashHex}`;
}
