import type { VolunteerSession } from "@/lib/volunteer/types";

/** Replaceable demo Volunteer Session — not production identity. */
export const demoVolunteerSession: VolunteerSession = {
  user: {
    id: "user-demo-001",
    firstName: "Daniel",
    lastName: "Volunteer",
    displayName: "Daniel",
    email: "daniel@example.church",
    avatarInitials: "D",
  },
  workspace: {
    id: "workspace-voa-east-antioch",
    name: "Victory Outreach Antioch",
    campusLabel: "East Antioch Campus",
  },
  membership: {
    id: "membership-demo-001",
    userId: "user-demo-001",
    workspaceId: "workspace-voa-east-antioch",
    status: "active",
    joinedAt: "2026-03-01",
  },
  positions: [
    {
      id: "pos-audio-setup-crew",
      departmentId: "audio",
      name: "Audio Setup Crew",
      description: "Unload, place, and connect Sunday audio systems.",
      active: true,
    },
    {
      id: "pos-foh-operator",
      departmentId: "audio",
      name: "FOH Operator",
      description: "Operate the Yamaha TF5 during soundcheck and service.",
      active: true,
    },
  ],
  departmentAssignments: [
    {
      id: "assign-audio-demo-001",
      membershipId: "membership-demo-001",
      departmentId: "audio",
      growthLevel: "assisted",
      assignedPositionIds: ["pos-audio-setup-crew"],
      active: true,
      assignedAt: "2026-03-15",
      overseerMembershipId: "membership-overseer-audio",
      currentTrainingPathId: "path-audio-setup-crew",
    },
  ],
  qualifications: [
    {
      id: "qual-audio-setup-demo-001",
      positionId: "pos-audio-setup-crew",
      membershipId: "membership-demo-001",
      status: "assisted",
      trainingProgress: 100,
      requiredCourseIds: ["course-audio-setup-foundations"],
      completedCourseIds: ["course-audio-setup-foundations"],
      prerequisiteStatus: "complete",
      requiredShadowServices: 2,
      completedShadowServices: 2,
      shadowApprovals: ["membership-overseer-audio"],
      requiredAssistedServices: 3,
      completedAssistedServices: 1,
      requiredCompetencyIds: [
        "comp-unload",
        "comp-foh-table",
        "comp-snakes",
        "comp-speakers",
        "comp-monitors",
        "comp-wireless",
        "comp-power-sequence",
        "comp-foh-setup-checkoff",
        "comp-teardown",
      ],
      completedCompetencyIds: [
        "comp-unload",
        "comp-foh-table",
        "comp-snakes",
        "comp-speakers",
        "comp-monitors",
        "comp-wireless",
        "comp-power-sequence",
      ],
      competencyApprovals: [],
      finalApprovalStatus: "not-requested",
      advancedModulesCompleted: [],
      advancedSpecialties: [],
      refresherRequired: false,
      recheckRequired: false,
    },
  ],
  activeDepartmentId: "audio",
  journey: {
    departmentId: "audio",
    positionId: "pos-audio-setup-crew",
    growthTrack: [
      { level: "new-volunteer", state: "completed" },
      { level: "learning", state: "completed" },
      { level: "shadowing", state: "completed" },
      { level: "assisted", state: "current" },
      { level: "ready-to-serve", state: "next" },
      { level: "advanced", state: "locked" },
    ],
    nextStep: {
      id: "step-foh-setup-checkoff",
      title: "Complete FOH Setup checkoff",
      detail: "Finish the remaining hands-on competencies with your Assisted partner.",
      href: "/volunteer/journey",
    },
  },
  sundayAssignment: {
    id: "assign-sunday-2026-08-16",
    serviceDate: "2026-08-16",
    serviceLabel: "Sunday Worship",
    callTime: "8:00 AM",
    departmentId: "audio",
    positionId: "pos-audio-setup-crew",
    overseerName: "Audio Overseer",
    teammates: [
      {
        membershipId: "membership-setup-partner",
        displayName: "Jordan Hale",
        roleLabel: "Audio Setup Crew · Qualified",
      },
      {
        membershipId: "membership-overseer-audio",
        displayName: "Elena Ruiz",
        roleLabel: "Audio Overseer",
      },
    ],
  },
  notices: [
    {
      id: "notice-foh-checkoff",
      title: "Required checkoff pending",
      detail: "FOH Setup checkoff still needs completion.",
      href: "/volunteer/journey",
      tone: "action",
    },
  ],
  trainingHistory: [
    {
      id: "history-audio-setup-foundations",
      membershipId: "membership-demo-001",
      courseId: "course-audio-setup-foundations",
      title: "Audio Setup Foundations",
      completedAt: "2026-04-12",
    },
  ],
};

export function getDemoVolunteerSession(): VolunteerSession {
  return demoVolunteerSession;
}
