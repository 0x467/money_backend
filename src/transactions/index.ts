import { dinero, add, subtract, toSnapshot } from "dinero.js";
import { schemaComposer } from "../schema/schema_composer";
import { Transaction } from "./transaction";
import { TransactionAddInput } from "./transaction_add_input";
import { TransactionAddPayload } from "./transaction_add_payload";
import { TransactionID } from "./transaction_id";
import { currency } from "../currency";

schemaComposer.Query.addFields({
  transaction: {
    type: Transaction,
    args: {
      id: {
        description: "Transaction ID",
        type: TransactionID.NonNull,
      },
    },
    resolve: (s, { id }, { user, transactions }) => {
      return transactions.findOne({ _id: id, ownerId: user._id });
    },
  },
  transactionCollection: {
    type: Transaction.List.NonNull,
    resolve: (s, a, { user, transactions }) => {
      return transactions.find({ ownerId: user._id }).toArray();
    },
  },
});

schemaComposer.Mutation.addNestedFields({
  "transaction.add": {
    type: TransactionAddPayload.NonNull,
    args: {
      input: {
        type: TransactionAddInput.NonNull,
      },
    },
    resolve: async (s, { input }, { user, accounts, transactions }) => {
      const sourceAccount = await accounts.findOne({
        _id: input.sourceAccountId,
        ownerId: user._id,
      });
      const targetAccount = await accounts.findOne({
        _id: input.targetAccountId,
        ownerId: user._id,
      });

      const sourceAccountBalance = dinero({
        amount: sourceAccount!.balance,
        currency,
      });
      const targetAccountBalance = dinero({
        amount: targetAccount!.balance,
        currency,
      });

      const transactionAmount = dinero({ amount: input.amount, currency });

      const sourceAccountBalanceResult = subtract(
        sourceAccountBalance,
        transactionAmount
      );
      const targetAccountBalanceResult = add(
        targetAccountBalance,
        transactionAmount
      );

      await accounts.updateOne(
        { _id: sourceAccount!._id, ownerId: user._id },
        { $set: { balance: toSnapshot(sourceAccountBalanceResult).amount } }
      );
      await accounts.updateOne(
        { _id: targetAccount!._id, ownerId: user._id },
        { $set: { balance: toSnapshot(targetAccountBalanceResult).amount } }
      );

      const insertRes = await transactions.insertOne({
        ...input,
        ownerId: user._id,
      });
      const transactionAdded = await transactions.findOne({
        _id: insertRes.insertedId,
      });
      return {
        record: transactionAdded,
        recordId: transactionAdded!._id,
        query: {},
      };
    },
  },
});
