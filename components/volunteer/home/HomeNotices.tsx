"use client";

import Link from "next/link";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import { volunteerUi } from "@/lib/volunteer/ui";

export function HomeNotices() {
  const session = useVolunteerSession();
  if (session.notices.length === 0) return null;

  return (
    <section>
      <p className={`mb-2 ${volunteerUi.eyebrow}`}>For you</p>
      <ul className="space-y-2">
        {session.notices.map((notice) => (
          <li key={notice.id}>
            {notice.href ? (
              <Link
                href={notice.href}
                className={`${volunteerUi.card} ${volunteerUi.cardPad} block`}
              >
                <p className="text-[14px] font-medium text-white">{notice.title}</p>
                {notice.detail && (
                  <p className={`mt-0.5 ${volunteerUi.muted}`}>{notice.detail}</p>
                )}
              </Link>
            ) : (
              <div className={`${volunteerUi.card} ${volunteerUi.cardPad}`}>
                <p className="text-[14px] font-medium text-white">{notice.title}</p>
                {notice.detail && (
                  <p className={`mt-0.5 ${volunteerUi.muted}`}>{notice.detail}</p>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
