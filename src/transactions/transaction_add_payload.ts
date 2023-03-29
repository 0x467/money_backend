import { schemaComposer } from "../schema/schema_composer";
import { Transaction } from "./transaction";
import { TransactionID } from "./transaction_id";

export const TransactionAddPayload = schemaComposer.createObjectTC({
  name: "TransactionAddPayload",
  fields: {
    record: Transaction,
    recordId: TransactionID,
    query: "Query",
  },
});
