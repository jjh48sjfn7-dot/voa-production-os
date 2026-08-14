"use client";

import Image from "next/image";
import { useFormStatus } from "react-dom";
import { brandAssetDimensions, brandAssets } from "@/lib/brand-assets";

export function AuthScreen({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  const mark = brandAssetDimensions.circle;

  return (
    <div className="flex min-h-dvh flex-col bg-[#0D0D0D] px-4 py-10 text-white">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
        <div className="mb-8 flex flex-col items-center text-center">
          <Image
            src={brandAssets.circle}
            alt="Victory Outreach Antioch"
            width={mark.width}
            height={mark.height}
            priority
            className="h-16 w-16 object-contain"
          />
          <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
            Production OS
          </p>
          <h1 className="mt-2 text-[26px] font-semibold tracking-tight text-white">
            {title}
          </h1>
          {description ? (
            <p className="mt-2 text-[14px] leading-relaxed text-white/60">
              {description}
            </p>
          ) : null}
        </div>
        <div className="rounded-2xl border border-white/[0.08] bg-[#1A1A1A]/95 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] sm:p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

export function AuthField({
  id,
  label,
  type,
  name,
  autoComplete,
  required = true,
}: {
  id: string;
  label: string;
  type: "email" | "password";
  name: string;
  autoComplete: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[13px] font-medium text-white/70">
        {label}
      </span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="min-h-[44px] w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-[16px] text-white placeholder:text-white/35 shadow-[inset_0_1px_2px_rgba(0,0,0,0.25)] outline-none transition-[border-color,box-shadow] focus:border-[#FF5A00]/35 focus:ring-2 focus:ring-[#FF5A00]/20 sm:text-sm"
      />
    </label>
  );
}

export function AuthError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-[13px] text-red-200"
    >
      {message}
    </p>
  );
}

export function AuthSubmit({ children }: { children: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl bg-[#FF5A00] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(255,90,0,0.28)] transition-colors hover:bg-[#E65100] disabled:opacity-70"
    >
      {pending ? "Please wait…" : children}
    </button>
  );
}
