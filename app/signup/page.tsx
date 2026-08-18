import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/SignupForm";
import { getAuthIdentity } from "@/lib/auth/identity";
import { getSafeNextPath } from "@/lib/auth/paths";

export const metadata: Metadata = {
  title: "Create account | Production OS",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = getSafeNextPath(params.next, "/volunteer");
  const identity = await getAuthIdentity();
  if (identity) redirect(nextPath);
  return <SignupForm nextPath={nextPath} />;
}
