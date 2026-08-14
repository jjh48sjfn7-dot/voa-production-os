export const volunteerNavItems = [
  { href: "/volunteer", label: "Home", match: "home" },
  { href: "/volunteer/journey", label: "Journey", match: "journey" },
  { href: "/volunteer/sunday", label: "Sunday", match: "sunday" },
  { href: "/volunteer/department", label: "Department", match: "department" },
  { href: "/volunteer/help", label: "Help", match: "help" },
] as const;

export type VolunteerNavMatch = (typeof volunteerNavItems)[number]["match"];

export function getVolunteerNavMatch(
  pathname: string
): VolunteerNavMatch | null {
  if (pathname.startsWith("/volunteer/profile")) return null;
  if (pathname.startsWith("/volunteer/journey")) return "journey";
  if (pathname.startsWith("/volunteer/sunday")) return "sunday";
  if (pathname.startsWith("/volunteer/department")) return "department";
  if (pathname.startsWith("/volunteer/help")) return "help";
  return "home";
}
