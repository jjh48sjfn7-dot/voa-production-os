import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import type { BreadcrumbItem } from "@/types/audio";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[13px]">
        <li>
          <Link
            href="/"
            className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg text-slate-500 transition-[background-color,color] duration-200 hover:bg-white/[0.05] hover:text-slate-300"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="sr-only">Dashboard</span>
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3.5 w-3.5 text-slate-600" />
              {isLast || !item.href ? (
                <span
                  className={
                    isLast
                      ? "font-medium text-red-400"
                      : "text-slate-500"
                  }
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 transition-colors duration-150 hover:text-slate-300"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
