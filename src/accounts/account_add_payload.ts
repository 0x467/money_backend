import { schemaComposer } from "../schema/schema_composer";
import { Account } from "./account";
import { AccountID } from "./account_id";

export const AccountAddPayload = schemaComposer.createObjectTC({
  name: "AccountAddPayload",
  fields: {
    record: Account,
    recordId: AccountID,
    query: "Query",
  },
});
