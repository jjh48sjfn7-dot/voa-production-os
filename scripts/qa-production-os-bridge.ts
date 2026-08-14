import {
  getAudioSignalFlowDocument,
  getBlueprintVenueContext,
  getDepartmentDocumentationPages,
  getDepartmentEquipment,
  getDepartmentSundaySetup,
  getDepartmentTroubleshootingTopics,
  getDocumentationPage,
  getEquipmentBySlug,
  getProductionChurch,
  getProductionDepartments,
  getSundaySetupReferencePhotos,
  getTheaterBlueprint,
  getTroubleshootingGuide,
} from "@/lib/production-os";
import { sundaySetupV2Sections } from "@/data/audio/v2/sunday-setup";
import { lightingSetupSections } from "@/data/lighting/v2/sunday-setup";
import { mediaSetupSections } from "@/data/media/v2/sunday-setup";
import { theaterBlueprint } from "@/data/blueprint/theater";
import { voaVenue } from "@/data/audio/venue";
import { getVolunteerSession } from "@/lib/volunteer/adapters/session";

function assert(condition: unknown, message: string) {
  if (!condition) {
    throw new Error(`QA failed: ${message}`);
  }
}

const church = getProductionChurch();
assert(church.name === voaVenue.church, "church name must come from voaVenue");
assert(church.name === "Victory Outreach Antioch", "expected real VOA identity");

const departments = getProductionDepartments();
assert(
  departments.map((department) => department.id).join(",") === "audio,lighting,media",
  "departments must be audio, lighting, media"
);
assert(
  departments.every((department) => department.name.length > 0),
  "department labels must be present"
);

const audioEquipment = getDepartmentEquipment("audio");
const lightingEquipment = getDepartmentEquipment("lighting");
const mediaEquipment = getDepartmentEquipment("media");
assert(audioEquipment.length > 0, "audio v2 equipment required");
assert(lightingEquipment.length > 0, "lighting v2 equipment required");
assert(mediaEquipment.length > 0, "media v2 equipment required");
assert(getEquipmentBySlug("audio", "yamaha-tf5")?.name.includes("TF5"), "TF5 from v2");
assert(getEquipmentBySlug("lighting", "dmxking-micro"), "lighting v2 slug");
assert(getEquipmentBySlug("media", "foh-mac"), "media v2 slug");

const audioSetup = getDepartmentSundaySetup("audio");
assert(audioSetup.sections === sundaySetupV2Sections, "audio setup must be the v2 array");
assert(
  audioSetup.sections.map((section) => section.id).join(",") ===
    sundaySetupV2Sections.map((section) => section.id).join(","),
  "audio setup order must be unchanged"
);
assert(
  getDepartmentSundaySetup("lighting").sections === lightingSetupSections,
  "lighting setup must be the v2 array"
);
assert(
  getDepartmentSundaySetup("media").sections === mediaSetupSections,
  "media setup must be the v2 array"
);
assert(audioSetup.sections[0].title === sundaySetupV2Sections[0].title, "setup wording preserved");

const audioPhotos = getSundaySetupReferencePhotos("audio");
assert("positioning" in audioPhotos, "audio setup photos from existing registry");

const audioTopics = getDepartmentTroubleshootingTopics("audio");
assert(audioTopics.length > 0, "audio v2 troubleshooting topics");
assert(getTroubleshootingGuide("audio", audioTopics[0].id)?.checks.length, "guide checks present");
assert(getDepartmentTroubleshootingTopics("lighting").length > 0, "lighting topics");
assert(getDepartmentTroubleshootingTopics("media").length > 0, "media topics");

assert(getDepartmentDocumentationPages("audio").length > 0, "audio docs");
assert(getDocumentationPage("audio", "wiring-standards"), "wiring-standards page");
assert(getAudioSignalFlowDocument().id === "signal-flow", "live audio signal-flow document");
assert(getDepartmentDocumentationPages("lighting").length > 0, "lighting docs");
assert(getDepartmentDocumentationPages("media").length > 0, "media docs");

const blueprint = getTheaterBlueprint();
assert(blueprint === theaterBlueprint, "blueprint selector must not clone geometry");
assert(getBlueprintVenueContext().churchName === voaVenue.church, "blueprint venue uses church");

const session = getVolunteerSession();
assert(session.workspace.name === voaVenue.church, "session workspace from Production OS");
assert(session.user === null, "user must be unconnected");
assert(session.membership === null, "membership must be unconnected");
assert(session.sundayAssignment === null, "no fake Sunday assignment");
assert(session.journey === null, "no fake journey");
assert(session.positions.length === 0, "no invented positions");
assert(session.qualifications.length === 0, "no fake qualifications");
assert(session.trainingHistory.length === 0, "no fake training history");
assert(session.notices.length === 0, "no fake notices");
assert(session.departmentAssignments.length === 0, "no personal department assignment");
assert(
  session.availableDepartmentIds.join(",") === "audio,lighting,media",
  "available departments are real"
);

const forbidden = [
  "Daniel",
  "Jordan Hale",
  "Elena Ruiz",
  "Audio Overseer",
  "7 of 9",
  "FOH Setup checkoff",
];
const sessionText = JSON.stringify(session);
for (const value of forbidden) {
  assert(!sessionText.includes(value), `session must not contain ${value}`);
}

console.log("Production OS ↔ Volunteer bridge QA passed.");
console.log(`Church: ${church.name}`);
console.log(`Departments: ${departments.map((department) => department.name).join(", ")}`);
console.log(
  `Equipment counts: audio ${audioEquipment.length}, lighting ${lightingEquipment.length}, media ${mediaEquipment.length}`
);
console.log(`Audio setup sections: ${audioSetup.sections.length}`);
console.log(`Blueprint items: ${blueprint.items.length}`);
