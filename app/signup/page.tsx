import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { SignupForm } from "@/components/auth/SignupForm";
import { getAuthIdentity } from "@/lib/auth/identity";

export const metadata: Metadata = {
  title: "Create account | Production OS",
};

export default async function SignupPage() {
  const identity = await getAuthIdentity();
  if (identity) redirect("/volunteer");
  return <SignupForm />;
}
