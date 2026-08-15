import Link from "next/link";
import { volunteerUi } from "@/lib/volunteer/ui";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={volunteerUi.page}>
      <header className="border-b border-white/[0.08] bg-[#141414]/95">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              Production OS
            </p>
            <p className="mt-0.5 text-[15px] font-semibold text-white">Admin</p>
          </div>
          <Link
            href="/volunteer"
            className="text-[13px] font-medium text-[#FF8A4C] hover:text-[#FF5A00]"
          >
            Volunteer Mode
          </Link>
        </div>
      </header>
      <main className="px-4 py-6 sm:px-6">
        <div className="mx-auto max-w-2xl">{children}</div>
      </main>
    </div>
  );
}
