import Link from "next/link";
import { BookOpen, CalendarDays, HelpCircle, Layers } from "lucide-react";
import { volunteerUi } from "@/lib/volunteer/ui";

const items = [
  { href: "/volunteer/journey", label: "My Journey", icon: BookOpen },
  { href: "/volunteer/sunday", label: "My Sunday", icon: CalendarDays },
  { href: "/volunteer/department", label: "Department", icon: Layers },
  { href: "/volunteer/help", label: "Help", icon: HelpCircle },
];

export function QuickAccess() {
  return (
    <section>
      <p className={`mb-2 ${volunteerUi.eyebrow}`}>Quick access</p>
      <div className="grid grid-cols-2 gap-2">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${volunteerUi.card} flex min-h-[72px] items-center gap-3 px-3.5`}
            >
              <Icon className="h-[18px] w-[18px] text-[#FF5A00]" strokeWidth={1.75} />
              <span className="text-[14px] font-medium text-white">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
