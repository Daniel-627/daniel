import { type SchemaTypeDefinition } from "sanity";

import project from "./project";
import testimonial from "./testimonial";
import clientLogo from "./clientLogo";
import service from "./service";
import processStep from "./processStep";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, testimonial, clientLogo, service, processStep],
};