import type { LucideIcon } from "lucide-react";
import { uiSpacing, uiType, uiPageIcon } from "@/lib/ui-tokens";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

/** Top-of-page header — matches AudioPageShell typography */
export function PageHeader({
  eyebrow,
  title,
  description,
  icon: Icon,
  action,
  className = "",
}: PageHeaderProps) {
  return (
    <header className={`${uiSpacing.sectionHeader} ${className}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3.5 md:gap-4">
          {Icon && (
            <div className={uiPageIcon}>
              <Icon />
            </div>
          )}
          <div className="min-w-0 flex-1 pt-0.5">
            {eyebrow && <p className={uiType.eyebrow}>{eyebrow}</p>}
            <h1 className={`${uiType.display} ${eyebrow ? "mt-1" : ""}`}>
              {title}
            </h1>
            {description && (
              <p className={`mt-1.5 max-w-3xl ${uiType.body}`}>{description}</p>
            )}
          </div>
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </header>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function SectionHeader({
  title,
  description,
  action,
}: SectionHeaderProps) {
  return (
    <div
      className={`${uiSpacing.sectionHeader} flex flex-col gap-2.5 sm:flex-row sm:items-end sm:justify-between`}
    >
      <div>
        <h2 className={uiType.heading}>{title}</h2>
        {description && (
          <p className={`mt-1.5 max-w-2xl ${uiType.body}`}>{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
