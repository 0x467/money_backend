import DataLoader from "dataloader";
import { ObjectId } from "mongodb";
import { Account } from "../accounts/account";
import { DateTime } from "../common/scalars/date_time";
import { schemaComposer } from "../schema/schema_composer";
import { TransactionID } from "./transaction_id";

export const Transaction = schemaComposer.createObjectTC({
  name: "Transaction",
  fields: {
    id: {
      description: "Transaction ID",
      type: TransactionID.NonNull,
      resolve: (s) => s._id,
    },
    date: {
      description: "Transaction date",
      type: DateTime.NonNull,
    },
    amount: {
      description: "Transaction amount",
      type: "Int!",
    },
    sourceAccount: {
      type: Account.NonNull,
      resolve: (source, args, { dataloaders, accounts }, { fieldNodes }) => {
        let dl = dataloaders.get(fieldNodes);
        if (!dl) {
          // @ts-expect-error ?
          dl = new DataLoader(async (ids: ObjectId[]) => {
            const acc = await accounts.find({ _id: { $in: ids } }).toArray();
            return ids.map((id) => acc.find((x) => x._id.equals(id)));
          });
          dataloaders.set(fieldNodes, dl);
        }
        return dl.load(source.sourceAccountId);
      },
    },
    targetAccount: {
      type: Account.NonNull,
      resolve: (source, args, { dataloaders, accounts }, { fieldNodes }) => {
        let dl = dataloaders.get(fieldNodes);
        if (!dl) {
          // @ts-expect-error ?
          dl = new DataLoader(async (ids: ObjectId[]) => {
            const acc = await accounts.find({ _id: { $in: ids } }).toArray();
            return ids.map((id) => acc.find((x) => x._id.equals(id)));
          });
          dataloaders.set(fieldNodes, dl);
        }
        return dl.load(source.targetAccountId);
      },
    },
  },
});
