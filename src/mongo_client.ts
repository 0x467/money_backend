import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./env";

export const mongoClient = new MongoClient(MONGODB_URI);
