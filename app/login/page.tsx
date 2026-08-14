import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { getAuthIdentity } from "@/lib/auth/identity";

export const metadata: Metadata = {
  title: "Sign in | Production OS",
};

export default async function LoginPage() {
  const identity = await getAuthIdentity();
  if (identity) redirect("/volunteer");
  return <LoginForm />;
}
