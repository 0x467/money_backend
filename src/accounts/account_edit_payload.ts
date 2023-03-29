import { schemaComposer } from "../schema/schema_composer";
import { Account } from "./account";
import { AccountID } from "./account_id";

export const AccountEditPayload = schemaComposer.createObjectTC({
  name: "AccountEditPayload",
  fields: {
    record: Account,
    recordId: AccountID,
    query: "Query",
  },
});
