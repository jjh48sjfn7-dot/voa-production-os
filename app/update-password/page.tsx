import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { UpdatePasswordForm } from "@/components/auth/UpdatePasswordForm";
import { getAuthIdentity } from "@/lib/auth/identity";

export const metadata: Metadata = {
  title: "Update password | Production OS",
};

export default async function UpdatePasswordPage() {
  const identity = await getAuthIdentity();
  if (!identity) {
    redirect("/login");
  }

  return <UpdatePasswordForm />;
}
