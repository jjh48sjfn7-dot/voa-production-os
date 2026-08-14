/** Volunteer Mode domain models — foundation types only. Replace mock session later. */

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
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  avatarInitials: string;
}

export interface ChurchWorkspace {
  id: string;
  name: string;
  campusLabel?: string;
}

export interface TeamMembership {
  id: string;
  userId: string;
  workspaceId: string;
  status: MembershipStatus;
  joinedAt: string;
}

/** Church-appointed leadership. Separate from software permissions. */
export interface LeadershipAppointment {
  id: string;
  membershipId: string;
  departmentId?: DepartmentId;
  title: string;
}

/** Product/software access. Separate from church leadership. */
export interface SoftwarePermissionGrant {
  membershipId: string;
  permissionId: string;
}

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

/** Stored separately from the main Journey view. */
export interface TrainingHistoryEntry {
  id: string;
  membershipId: string;
  courseId: string;
  title: string;
  completedAt: string;
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
  user: UserAccount;
  workspace: ChurchWorkspace;
  membership: TeamMembership;
  positions: Position[];
  departmentAssignments: DepartmentAssignment[];
  qualifications: PositionQualificationRecord[];
  activeDepartmentId: DepartmentId;
  journey: DepartmentJourney;
  sundayAssignment: SundayAssignment | null;
  notices: PersonalNotice[];
  trainingHistory: TrainingHistoryEntry[];
}
