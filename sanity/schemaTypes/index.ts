import { type SchemaTypeDefinition } from "sanity";

import project from "./project";
import testimonial from "./testimonial";
import clientLogo from "./clientLogo";
import service from "./service";
import processStep from "./processStep";
import socialLink from "./socialLink";
import skill from "./skill";
import timelineEntry from "./timelineEntry";
import aboutPage from "./aboutPage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    project,
    testimonial,
    clientLogo,
    service,
    processStep,
    socialLink,
    skill,
    timelineEntry,
    aboutPage,
  ],
};