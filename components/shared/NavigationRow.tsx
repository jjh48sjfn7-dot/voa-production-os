import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface DocumentationRowProps {
  title: string;
  href: string;
}

export function DocumentationRow({ title, href }: DocumentationRowProps) {
  return (
    <Link
      href={href}
      className="flex min-h-[52px] items-center gap-3 px-4 py-3.5 transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5 sm:py-4"
    >
      <p className="flex-1 text-base font-medium text-slate-50">{title}</p>
      <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />
    </Link>
  );
}

interface NavigationRowProps {
  title: string;
  href?: string;
  icon?: string;
  disabled?: boolean;
}

export function NavigationRow({
  title,
  href,
  icon,
  disabled = false,
}: NavigationRowProps) {
  const isDisabled = disabled || !href;
  const rowClassName =
    "flex min-h-[52px] items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4";

  const content = (
    <>
      {icon && (
        <span className="text-xl leading-none" aria-hidden>
          {icon}
        </span>
      )}
      <p
        className={`flex-1 text-base font-medium ${
          isDisabled ? "text-slate-500" : "text-slate-50"
        }`}
      >
        {title}
      </p>
      {!isDisabled && <ChevronRight className="h-5 w-5 shrink-0 text-slate-600" />}
    </>
  );

  if (isDisabled) {
    return (
      <div className={rowClassName} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href!}
      className={`${rowClassName} transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05]`}
    >
      {content}
    </Link>
  );
}
