import {
  getProductionChurch,
  getProductionDepartments,
} from "@/lib/production-os";
import type { VolunteerSession } from "@/lib/volunteer/types";

/**
 * Assembles Volunteer Session from real Production OS church data
 * plus unconnected personal records. Replace with auth/database later.
 */
export function getVolunteerSession(): VolunteerSession {
  const church = getProductionChurch();
  const departments = getProductionDepartments();

  return {
    user: null,
    workspace: {
      id: church.id,
      name: church.name,
      campusLabel: church.campusLabel,
    },
    membership: null,
    availableDepartmentIds: departments.map((department) => department.id),
    positions: [],
    departmentAssignments: [],
    qualifications: [],
    activeDepartmentId: null,
    journey: null,
    sundayAssignment: null,
    notices: [],
    trainingHistory: [],
  };
}
