"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import type { ReferencePhoto } from "@/lib/reference-photos";
import { theme } from "@/lib/theme";

interface SetupReferenceProps {
  photo: ReferencePhoto;
  /** Optional label above the image (e.g. “Overall position”). */
  label?: string;
  enlarge?: boolean;
  priority?: boolean;
  /** Override next/image sizes. Keep conservative so the optimizer never requests 3840px. */
  sizes?: string;
}

const DEFAULT_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 540px";

export function SetupReference({
  photo,
  label,
  enlarge = true,
  priority = false,
  sizes = DEFAULT_SIZES,
}: SetupReferenceProps) {
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  return (
    <figure className="w-full">
      {label && (
        <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </figcaption>
      )}

      <div
        className={`overflow-hidden rounded-2xl border ${theme.cardBorder} ${theme.surface} shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]`}
      >
        <div className="flex w-full items-center justify-center p-2 sm:p-3">
          <Image
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes={sizes}
            className="h-auto max-h-[min(72vh,520px)] w-auto max-w-full object-contain"
          />
        </div>

        {(photo.caption || enlarge) && (
          <div className="flex items-start justify-between gap-3 border-t border-white/[0.06] px-3 py-2.5 sm:px-4">
            {photo.caption ? (
              <p className="min-w-0 flex-1 text-[13px] leading-snug text-slate-400">
                {photo.caption}
              </p>
            ) : (
              <span className="flex-1" />
            )}
            {enlarge && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-lg px-2 py-1 text-[12px] font-medium text-slate-400 transition-colors hover:bg-white/[0.06] hover:text-slate-200"
              >
                <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.75} />
                View larger
              </button>
            )}
          </div>
        )}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={photo.alt}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close enlarged photo"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="100vw"
              className="max-h-[90vh] w-auto max-w-full object-contain"
              priority
            />
          </div>
        </div>
      )}
    </figure>
  );
}
