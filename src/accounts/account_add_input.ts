import { schemaComposer } from "../schema/schema_composer";

export const AccountAddInput = schemaComposer.createInputTC({
  name: "AccountAddInput",
  fields: {
    name: {
      description: "Account name",
      type: "String!",
    },
    balance: {
      description: "Account initial balance",
      type: "Int",
      defaultValue: 0,
    },
  },
});
