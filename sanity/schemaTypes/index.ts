import { type SchemaTypeDefinition } from "sanity";
import { resumeType } from "./CVType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [resumeType],
};
