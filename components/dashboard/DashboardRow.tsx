import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { dashboardStyles } from "@/lib/dashboard-styles";
import { departmentAccents, type DepartmentAccent } from "@/lib/theme";

interface DashboardRowProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  accent?: DepartmentAccent;
  href?: string;
  onClick?: () => void;
}

export function DashboardRow({
  title,
  description,
  icon: Icon,
  accent = "default",
  href,
  onClick,
}: DashboardRowProps) {
  const colors = departmentAccents[accent];
  const className =
    "flex min-h-[52px] w-full items-center gap-3.5 px-4 py-3.5 text-left transition-colors duration-150 hover:bg-white/[0.03] active:bg-white/[0.05] sm:px-5 sm:py-4";

  const content = (
    <>
      {Icon && (
        <div
          className={`${dashboardStyles.iconBox} ${colors.iconBg}`}
        >
          <Icon />
        </div>
      )}
      <div className="min-w-0 flex-1">
        {description && (
          <p className={`${dashboardStyles.caption} text-slate-500`}>{description}</p>
        )}
        <p
          className={`font-medium text-slate-50 ${
            description ? "mt-0.5" : ""
          } ${dashboardStyles.title}`}
        >
          {title}
        </p>
      </div>
      <ChevronRight className={`${dashboardStyles.iconSm} shrink-0 text-slate-600`} />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {content}
    </button>
  );
}
