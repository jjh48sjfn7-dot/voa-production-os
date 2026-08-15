/** Volunteer Mode domain models. Personal/membership truth comes from the database. */

export type MembershipStatus = "invited" | "active" | "inactive" | "archived";

export type DepartmentId = "audio" | "lighting" | "media";

export type DepartmentGrowthLevel =
  | "new-volunteer"
  | "learning"
  | "shadowing"
  | "assisted"
  | "ready-to-serve"
  | "advanced";

export type PositionQualificationStatus =
  | "not-started"
  | "learning"
  | "shadowing"
  | "assisted"
  | "qualified"
  | "advanced";

export type JourneyStepState = "completed" | "current" | "next" | "locked";

export type ApprovalStatus = "pending" | "approved" | "rejected";

export type ChecklistTaskStatus = "not-started" | "needs-attention" | "complete";

export type SundayLifecyclePhase =
  | "today-overview"
  | "setup"
  | "ready-for-service"
  | "service-mode"
  | "teardown"
  | "sunday-complete";

export type SundaySupportMode = "shadowing" | "assisted" | "operational";

export interface UserAccount {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  avatarInitials: string | null;
}

export interface ChurchWorkspace {
  id: string;
  name: string;
  slug: string;
  timezone: string;
  productionOsKey: string | null;
  isActive: boolean;
  campusLabel?: string;
}

export interface TeamMembership {
  id: string;
  userId: string;
  workspaceId: string;
  status: MembershipStatus;
  joinedAt: string | null;
}

export type LeadershipRoleKey = "production_overseer" | "department_overseer";

/** Church-appointed leadership. Separate from software permissions. */
export interface LeadershipAppointment {
  id: string;
  membershipId: string;
  roleKey: LeadershipRoleKey;
  departmentId?: DepartmentId;
}

export type SoftwarePermissionId =
  | "trainer"
  | "scheduler"
  | "department_editor"
  | "admin"
  | "builder";

/** Product/software access. Separate from church leadership. */
export interface SoftwarePermissionGrant {
  id: string;
  membershipId: string;
  permissionId: SoftwarePermissionId;
  workspaceDepartmentId: string | null;
}

/** How many active church memberships the signed-in account currently has. */
export type MembershipResolution = "single" | "none" | "multiple";

export interface Position {
  id: string;
  departmentId: DepartmentId;
  name: string;
  description: string;
  active: boolean;
  prerequisitePositionIds?: string[];
  requiredCourseIds?: string[];
  requiredShadowServices?: number;
  requiredAssistedServices?: number;
  competencyIds?: string[];
  sundayResponsibilities?: string[];
  schedulingGuidance?: string;
}

export interface PositionQualificationRecord {
  id: string;
  positionId: string;
  membershipId: string;
  status: PositionQualificationStatus;
  trainingProgress: number;
  requiredCourseIds: string[];
  completedCourseIds: string[];
  prerequisiteStatus: "incomplete" | "complete";
  requiredShadowServices: number;
  completedShadowServices: number;
  shadowApprovals: string[];
  requiredAssistedServices: number;
  completedAssistedServices: number;
  requiredCompetencyIds: string[];
  completedCompetencyIds: string[];
  competencyApprovals: string[];
  finalApprovalStatus: ApprovalStatus | "not-requested";
  approvedBy?: string;
  qualifiedAt?: string;
  advancedModulesCompleted: string[];
  advancedSpecialties: string[];
  refresherRequired: boolean;
  recheckRequired: boolean;
  qualificationNotes?: string;
}

export interface DepartmentAssignment {
  id: string;
  membershipId: string;
  departmentId: DepartmentId;
  growthLevel: DepartmentGrowthLevel;
  assignedPositionIds: string[];
  active: boolean;
  assignedAt: string;
  overseerMembershipId?: string;
  currentTrainingPathId?: string;
  leaderNotes?: string;
}

export interface JourneyNextStep {
  id: string;
  title: string;
  detail?: string;
  href: string;
}

export interface DepartmentJourney {
  departmentId: DepartmentId;
  positionId: string;
  growthTrack: { level: DepartmentGrowthLevel; state: JourneyStepState }[];
  nextStep: JourneyNextStep;
}

export interface SundayTeammate {
  membershipId: string;
  displayName: string;
  roleLabel: string;
}

export interface SundayAssignment {
  id: string;
  serviceDate: string;
  serviceLabel: string;
  callTime: string;
  departmentId: DepartmentId;
  positionId: string;
  overseerName: string;
  teammates: SundayTeammate[];
}

export interface PersonalNotice {
  id: string;
  title: string;
  detail?: string;
  href?: string;
  tone: "info" | "action";
}

export type TrainingHistoryKind = "course" | "shadow" | "checkoff";

export type RequirementProgress = "complete" | "in-progress" | "not-started";

/** Stored separately from the main Journey view. */
export interface TrainingHistoryEntry {
  id: string;
  membershipId: string;
  courseId: string;
  title: string;
  completedAt: string;
  kind?: TrainingHistoryKind;
  detail?: string;
}

export interface ChecklistTaskCompletion {
  membershipId: string;
  completedAt: string;
}

export interface SharedChecklistTask {
  id: string;
  label: string;
  status: ChecklistTaskStatus;
  requiredForReady: boolean;
  attentionNote?: string;
  completions: ChecklistTaskCompletion[];
}

export interface SharedChecklist {
  id: string;
  serviceId: string;
  departmentId: DepartmentId;
  tasks: SharedChecklistTask[];
}

export interface ServiceReadiness {
  systemReady: boolean;
  humanConfirmation: {
    confirmed: boolean;
    confirmedByMembershipId?: string;
    confirmedAt?: string;
  };
}

export interface VolunteerSession {
  user: UserAccount | null;
  membershipResolution: MembershipResolution;
  workspace: ChurchWorkspace | null;
  membership: TeamMembership | null;
  permissionGrants: SoftwarePermissionGrant[];
  leadershipAppointments: LeadershipAppointment[];
  /** Database workspace departments ∩ Production OS department registry. */
  availableDepartmentIds: DepartmentId[];
  positions: Position[];
  departmentAssignments: DepartmentAssignment[];
  qualifications: PositionQualificationRecord[];
  activeDepartmentId: DepartmentId | null;
  journey: DepartmentJourney | null;
  sundayAssignment: SundayAssignment | null;
  notices: PersonalNotice[];
  trainingHistory: TrainingHistoryEntry[];
}
