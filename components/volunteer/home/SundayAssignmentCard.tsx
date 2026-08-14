"use client";

import Link from "next/link";
import { ArrowRight, Clock, MapPin, Users } from "lucide-react";
import { useVolunteerSession } from "@/components/volunteer/VolunteerSessionProvider";
import {
  departmentLabels,
  formatServiceDate,
  getPositionName,
  growthLevelLabels,
  qualificationStatusLabels,
} from "@/lib/volunteer/labels";
import {
  getActiveAssignment,
  getActiveQualification,
  isServingToday,
} from "@/lib/volunteer/session";
import { volunteerUi } from "@/lib/volunteer/ui";

export function SundayAssignmentCard() {
  const session = useVolunteerSession();
  const assignment = session.sundayAssignment;
  if (!assignment) return null;

  const positionName = getPositionName(session.positions, assignment.positionId);
  const servingToday = isServingToday(session);
  const deptAssignment = getActiveAssignment(session);
  const qualification = getActiveQualification(session);

  return (
    <section className={`${volunteerUi.card} ${volunteerUi.cardPad} border-[#FF5A00]/20`}>
      <p className={volunteerUi.eyebrow}>
        {servingToday ? "Today" : "Upcoming service"}
      </p>
      <h2 className="mt-1.5 text-[20px] font-semibold tracking-tight text-white">
        {servingToday ? "You’re Serving Today" : "You’re Serving Sunday"}
      </h2>
      <p className="mt-1 text-[14px] text-white/55">
        {assignment.serviceLabel} · {formatServiceDate(assignment.serviceDate)}
      </p>
      {deptAssignment && (
        <p className="mt-1 text-[13px] text-white/40">
          {departmentLabels[deptAssignment.departmentId]} growth:{" "}
          {growthLevelLabels[deptAssignment.growthLevel]}
          {qualification
            ? ` · ${positionName}: ${qualificationStatusLabels[qualification.status]}`
            : ""}
        </p>
      )}

      <dl className="mt-4 grid grid-cols-2 gap-3 text-[13px]">
        <div>
          <dt className="text-white/40">Department</dt>
          <dd className="mt-0.5 font-medium text-white">
            {departmentLabels[assignment.departmentId]}
          </dd>
        </div>
        <div>
          <dt className="text-white/40">Position</dt>
          <dd className="mt-0.5 font-medium text-white">{positionName}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-white/40">
            <Clock className="h-3.5 w-3.5" /> Call time
          </dt>
          <dd className="mt-0.5 font-medium text-white">{assignment.callTime}</dd>
        </div>
        <div>
          <dt className="flex items-center gap-1 text-white/40">
            <MapPin className="h-3.5 w-3.5" /> Overseer
          </dt>
          <dd className="mt-0.5 font-medium text-white">{assignment.overseerName}</dd>
        </div>
      </dl>

      <div className="mt-4 border-t border-white/[0.06] pt-3">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-white/40">
          <Users className="h-3.5 w-3.5" /> Serving with you
        </p>
        <ul className="mt-2 space-y-1.5">
          {assignment.teammates.map((teammate) => (
            <li key={teammate.membershipId} className="text-[13px] text-white/70">
              <span className="font-medium text-white">{teammate.displayName}</span>
              <span className="text-white/40"> · {teammate.roleLabel}</span>
            </li>
          ))}
        </ul>
      </div>

      <Link href="/volunteer/sunday" className={`${volunteerUi.cta} mt-5 w-full`}>
        Open My Sunday
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </section>
  );
}
