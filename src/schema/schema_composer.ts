import { SchemaComposer } from "graphql-compose";
import { Collection, Document, ObjectId } from "mongodb";

export type Account = {
  name: string;
  balance: number;
  initialBalance: number;
  ownerId: ObjectId;
};

export type Transaction = {
  amount: number;
  ownerId: ObjectId;
};

export type User = {};

export type GraphQLContext = {
  dataloaders: WeakMap<object, any>;
  user: {
    _id: ObjectId;
  };
  accounts: Collection<Account & Document>;
  transactions: Collection<Transaction & Document>;
  users: Collection<User & Document>;
};

export const schemaComposer = new SchemaComposer<GraphQLContext>();
