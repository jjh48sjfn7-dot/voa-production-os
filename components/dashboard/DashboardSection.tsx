import { dashboardStyles } from "@/lib/dashboard-styles";

interface DashboardSectionProps {
  title: string;
  children: React.ReactNode;
}

export function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <section className="space-y-3">
      <h2 className={`px-1 ${dashboardStyles.label}`}>{title}</h2>
      <div className={`overflow-hidden ${dashboardStyles.card}`}>{children}</div>
    </section>
  );
}
