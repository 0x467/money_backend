import { GraphQLObjectID } from "../common/scalars/object_id";
import { schemaComposer } from "../schema/schema_composer";

export const TransactionID = schemaComposer.createScalarTC({
  name: "TransactionID",
  description: GraphQLObjectID.description,
  serialize: GraphQLObjectID.serialize,
  parseValue: GraphQLObjectID.parseValue,
  parseLiteral: GraphQLObjectID.parseLiteral,
});
