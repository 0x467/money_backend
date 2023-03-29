import { schemaComposer } from "../schema/schema_composer";
import { AccountID } from "./account_id";

export const Account = schemaComposer.createObjectTC({
  name: "Account",
  fields: {
    id: {
      description: "Account ID",
      type: AccountID.NonNull,
      resolve: (s) => s._id,
    },
    name: {
      description: "Account name",
      type: "String!",
    },
    balance: {
      description: "Account balance",
      type: "Int!",
    },
    initialBalance: {
      description: "Account initial balance",
      type: "Int!",
    },
  },
});
