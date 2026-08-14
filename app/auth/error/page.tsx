import type { Metadata } from "next";
import Link from "next/link";
import { AuthScreen } from "@/components/auth/AuthScreen";

export const metadata: Metadata = {
  title: "Authentication error | Production OS",
};

export default function AuthErrorPage() {
  return (
    <AuthScreen
      title="Link did not work"
      description="This confirmation or reset link is invalid or has expired. Request a new one from sign in."
    >
      <Link
        href="/login"
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#FF5A00] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#E65100]"
      >
        Back to sign in
      </Link>
    </AuthScreen>
  );
}
