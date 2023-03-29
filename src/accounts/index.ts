import { schemaComposer } from "../schema/schema_composer";
import { Account } from "./account";
import { AccountAddInput } from "./account_add_input";
import { AccountAddPayload } from "./account_add_payload";
import { AccountEditInput } from "./account_edit_input";
import { AccountEditPayload } from "./account_edit_payload";
import { AccountID } from "./account_id";

schemaComposer.Query.addFields({
  account: {
    type: Account,
    args: {
      id: {
        description: "Account ID",
        type: AccountID,
      },
    },
    resolve: (s, { id }, { user, accounts }) => {
      return accounts.findOne({ _id: id, ownerId: user._id });
    },
  },
  accountCollection: {
    type: Account.List.NonNull,
    resolve: (s, a, { user, accounts }) => {
      return accounts.find({ ownerId: user._id }).toArray();
    },
  },
});

schemaComposer.Mutation.addNestedFields({
  "accounts.add": {
    type: AccountAddPayload.NonNull,
    args: {
      input: {
        type: AccountAddInput.NonNull,
      },
    },
    resolve: async (s, { input }, { user, accounts }) => {
      const insertRes = await accounts.insertOne({
        ...input,
        initialBalance: input.balance,
        ownerId: user._id,
      });
      const accountAdded = await accounts.findOne({
        _id: insertRes.insertedId,
      });
      return {
        record: accountAdded,
        recordId: accountAdded!._id,
        query: {},
      };
    },
  },
  "account.edit": {
    type: AccountEditPayload.NonNull,
    args: {
      input: {
        type: AccountEditInput.NonNull,
      },
    },
    resolve: async (s, { input }, { user, accounts }) => {
      const { id, ...doc } = input;
      const updateRes = await accounts.updateOne(
        { _id: id, ownerId: user._id },
        { $set: { ...doc } }
      );
      const editedAccount = await accounts.findOne({
        _id: id,
        ownerId: user._id,
      });
      return {
        record: editedAccount,
        recordId: editedAccount!._id,
        query: {},
      };
    },
  },
});
