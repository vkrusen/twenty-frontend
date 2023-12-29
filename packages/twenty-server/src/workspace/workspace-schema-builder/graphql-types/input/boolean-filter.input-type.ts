import { GraphQLBoolean, GraphQLInputObjectType } from 'graphql';

import { FilterIs } from 'src/workspace/workspace-schema-builder/graphql-types/input/filter-is.input-type';

export const BooleanFilterType = new GraphQLInputObjectType({
  name: 'BooleanFilter',
  fields: {
    eq: { type: GraphQLBoolean },
    is: { type: FilterIs },
  },
});
