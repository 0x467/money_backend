import { GraphQLObjectID } from "../common/scalars/object_id";
import { schemaComposer } from "../schema/schema_composer";

export const AccountID = schemaComposer.createScalarTC({
  name: "AccountID",
  description: GraphQLObjectID.description,
  serialize: GraphQLObjectID.serialize,
  parseValue: GraphQLObjectID.parseValue,
  parseLiteral: GraphQLObjectID.parseLiteral,
});
