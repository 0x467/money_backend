import { AccountID } from "../accounts/account_id";
import { DateTime } from "../common/scalars/date_time";
import { schemaComposer } from "../schema/schema_composer";

export const TransactionAddInput = schemaComposer.createInputTC({
  name: "TransactionAddInput",
  fields: {
    date: {
      description: "Transaction date",
      type: DateTime.NonNull,
    },
    amount: {
      description: "Transaction amount",
      type: "Int!",
    },
    sourceAccountId: {
      type: AccountID.NonNull,
    },
    targetAccountId: {
      type: AccountID.NonNull,
    },
  },
});
