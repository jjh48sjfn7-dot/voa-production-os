/** Auth UI routes — stay outside the operational AppLayout shell. */
export const AUTH_UI_PATHS = [
  "/login",
  "/signup",
  "/forgot-password",
  "/update-password",
  "/auth/error",
] as const;

export function isVolunteerPath(pathname: string): boolean {
  return pathname === "/volunteer" || pathname.startsWith("/volunteer/");
}

export function isAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isBuilderPath(pathname: string): boolean {
  return pathname === "/builder" || pathname.startsWith("/builder/");
}

export function isAuthUiPath(pathname: string): boolean {
  return (AUTH_UI_PATHS as readonly string[]).includes(pathname);
}

export function isLoginOrSignupPath(pathname: string): boolean {
  return pathname === "/login" || pathname === "/signup";
}

/**
 * Allow only internal Production OS destinations.
 * Rejects protocol-relative, external, and traversal next values.
 */
export function getSafeNextPath(
  raw: string | null | undefined,
  fallback: string
): string {
  if (!raw) return fallback;

  let value = raw.trim();
  try {
    value = decodeURIComponent(value);
  } catch {
    return fallback;
  }

  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }
  if (value.includes("://") || value.includes("\\") || value.includes("%")) {
    return fallback;
  }

  let pathname: string;
  try {
    const parsed = new URL(value, "http://voa.invalid");
    if (parsed.username || parsed.password || parsed.hostname !== "voa.invalid") {
      return fallback;
    }
    pathname = parsed.pathname;
  } catch {
    return fallback;
  }

  if (pathname.includes("..")) return fallback;

  if (pathname === "/volunteer" || pathname.startsWith("/volunteer/")) {
    return pathname;
  }
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return pathname;
  }
  if (pathname === "/builder" || pathname.startsWith("/builder/")) {
    return pathname;
  }
  if (pathname === "/update-password" || pathname === "/login") {
    return pathname;
  }
  if (pathname === "/invite") {
    return pathname;
  }

  return fallback;
}

export function readSafeNextFromForm(
  formData: FormData,
  fallback: string
): string {
  return getSafeNextPath(String(formData.get("next") ?? ""), fallback);
}
