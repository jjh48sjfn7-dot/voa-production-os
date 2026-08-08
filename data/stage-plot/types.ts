export interface StagePlotIntro {
  title: string;
  body: string[];
}

export interface StagePlotLink {
  title: string;
  href: string;
}

/**
 * Volunteer-facing Stage Plot page metadata only.
 * Physical map geometry and coordinates live in data/blueprint/theater.ts.
 */
export interface StagePlotDocument {
  id: string;
  title: string;
  subtitle: string;
  intro: StagePlotIntro;
  relatedLinks: StagePlotLink[];
}
