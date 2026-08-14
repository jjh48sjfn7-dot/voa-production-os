import { voaVenue } from "@/data/audio/venue";

/** Real church identity from Production OS venue data. */
export interface ProductionChurch {
  id: string;
  name: string;
  campusLabel: string;
  address: string;
  serviceDay: number;
  serviceLabel: string;
  timezone: string;
  fohLocation: string;
}

function churchIdFromName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function getProductionChurch(): ProductionChurch {
  return {
    id: churchIdFromName(voaVenue.church),
    name: voaVenue.church,
    campusLabel: voaVenue.campus,
    address: voaVenue.address,
    serviceDay: voaVenue.serviceDay,
    serviceLabel: voaVenue.serviceLabel,
    timezone: voaVenue.timezone,
    fohLocation: voaVenue.fohLocation,
  };
}
