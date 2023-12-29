import {
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import { FilterIs } from 'src/workspace/workspace-schema-builder/graphql-types/input/filter-is.input-type';

export const BigIntFilterType = new GraphQLInputObjectType({
  name: 'BigIntFilter',
  fields: {
    eq: { type: GraphQLInt },
    gt: { type: GraphQLInt },
    gte: { type: GraphQLInt },
    in: { type: new GraphQLList(new GraphQLNonNull(GraphQLInt)) },
    lt: { type: GraphQLInt },
    lte: { type: GraphQLInt },
    neq: { type: GraphQLInt },
    is: { type: FilterIs },
  },
});
