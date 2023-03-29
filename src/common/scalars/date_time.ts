import { schemaComposer } from "../../schema/schema_composer";
import { DateTimeScalar } from "graphql-date-scalars";

export const DateTime = schemaComposer.createScalarTC({
  name: DateTimeScalar.name,
  description: DateTimeScalar.description,
  serialize: DateTimeScalar.serialize,
  parseValue: DateTimeScalar.parseValue,
  parseLiteral: DateTimeScalar.parseLiteral,
});
