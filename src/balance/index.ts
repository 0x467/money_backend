import { schemaComposer } from "../schema/schema_composer";
import { Balance } from "./balance";
import { dinero, add, toSnapshot } from "dinero.js";
import { currency } from "../currency";

schemaComposer.Query.addFields({
  balance: {
    type: Balance.NonNull,
    resolve: async (s, a, { user, accounts }) => {
      const acc = await accounts.find({ ownerId: user._id }).toArray();
      const overallDin = acc
        .map((account) => dinero({ amount: account.balance, currency }))
        .reduce(
          (result, current) => add(result, current),
          dinero({ amount: 0, currency })
        );

      const overall = toSnapshot(overallDin).amount;

      return {
        overall,
      };
    },
  },
});
