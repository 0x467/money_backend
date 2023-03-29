import { schemaComposer } from "../schema/schema_composer";

export const AccountEditInput = schemaComposer.createInputTC({
  name: "AccountEditInput",
  fields: {
    name: {
      description: "Account name",
      type: "String",
    },
  },
});
