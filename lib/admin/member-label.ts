export function adminMemberLabel(
  profile: {
    display_name: string | null;
    first_name: string | null;
    last_name: string | null;
  } | null,
  isCurrentUser: boolean
): string {
  const displayName = usable(profile?.display_name);
  if (displayName) return displayName;

  const firstName = usable(profile?.first_name);
  const lastName = usable(profile?.last_name);
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName) return firstName;

  return isCurrentUser ? "Your account" : "Team member";
}

function usable(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}
