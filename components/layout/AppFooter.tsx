import { uiType } from "@/lib/ui-tokens";
import { theme } from "@/lib/theme";

export function AppFooter() {
  return (
    <footer
      className={`mt-10 border-t ${theme.cardBorder} pt-8 pb-4 md:mt-12 md:pt-10`}
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold tracking-tight text-white/80">
            VOA Production OS v1.0
          </p>
          <p className={`mt-1 ${uiType.caption}`}>
            Built for Victory Outreach Antioch
          </p>
        </div>
        <p className={`mt-4 sm:mt-0 ${uiType.caption}`}>
          Progress saves locally on this device
        </p>
      </div>
    </footer>
  );
}
