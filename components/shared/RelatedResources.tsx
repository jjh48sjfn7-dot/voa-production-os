import { DividedCard } from "@/components/shared/DividedCard";
import { DocumentationRow, NavigationRow } from "@/components/shared/NavigationRow";
import type { ProductionIconId } from "@/lib/production-icons";
import type { DepartmentAccent } from "@/lib/theme";

export interface RelatedResourceItem {
  title: string;
  href?: string;
  icon?: ProductionIconId;
  accent?: DepartmentAccent;
  disabled?: boolean;
}

interface RelatedResourcesProps {
  items: RelatedResourceItem[];
  accent?: DepartmentAccent;
}

export function RelatedResources({ items, accent = "audio" }: RelatedResourcesProps) {
  return (
    <DividedCard>
      {items.map((item) => {
        const key = `${item.title}-${item.href ?? "disabled"}`;

        if (item.icon) {
          return (
            <NavigationRow
              key={key}
              title={item.title}
              href={item.href}
              icon={item.icon}
              accent={item.accent ?? accent}
              disabled={item.disabled}
            />
          );
        }

        if (!item.href || item.disabled) {
          return (
            <div
              key={key}
              className="flex min-h-[52px] items-center gap-3 px-4 py-3.5 sm:px-5 sm:py-4"
              aria-disabled="true"
            >
              <p className="flex-1 text-base font-medium text-slate-500">{item.title}</p>
            </div>
          );
        }

        return <DocumentationRow key={key} title={item.title} href={item.href} />;
      })}
    </DividedCard>
  );
}
