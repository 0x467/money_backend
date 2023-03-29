import "dotenv/config";
import http from "http";
import { ObjectId } from "mongodb";
import { createHandler } from "graphql-http/lib/use/http";
import {
  GraphQLContext,
  schemaComposer,
  Account,
  Transaction,
  User,
} from "./schema/schema_composer";
import { mongoClient } from "./mongo_client";
import "./accounts";
import "./transactions";
import "./balance";

const main = async (): Promise<void> => {
  await mongoClient.connect();

  const handler = createHandler({
    schema: schemaComposer.buildSchema(),
    context: (): GraphQLContext => {
      const db = mongoClient.db("money");
      const accounts = db.collection<Account>("accounts");
      const transactions = db.collection<Transaction>("transactions");
      const users = db.collection<User>("users");
      const user = {
        _id: new ObjectId("641dc31091cf86849cb6f290"),
      };
      const dataloaders = new WeakMap();
      return { dataloaders, user, accounts, transactions, users };
    },
  });

  const server = http.createServer((req, res) => {
    if (req.url?.startsWith("/graphql")) {
      handler(req, res);
    } else {
      res.writeHead(404).end();
    }
  });

  server.listen(4000);
  console.log("Listening to port 4000");
};

main();
