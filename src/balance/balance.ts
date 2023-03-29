import { schemaComposer } from "../schema/schema_composer";

export const Balance = schemaComposer.createObjectTC({
  name: "Balance",
  fields: {
    overall: {
      type: "Int!",
    },
  },
});
