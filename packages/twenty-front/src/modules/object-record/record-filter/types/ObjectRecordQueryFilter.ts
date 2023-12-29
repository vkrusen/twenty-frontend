export type UUIDFilterValue = string;

export type IsFilter = 'NULL' | 'NOT_NULL';

export type UUIDFilter = {
  eq?: UUIDFilterValue;
  in?: UUIDFilterValue[];
  neq?: UUIDFilterValue;
  is?: IsFilter;
};

export type BooleanFilter = {
  eq?: boolean;
  is?: IsFilter;
};

export type StringFilter = {
  eq?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  neq?: string;
  startsWith?: string;
  like?: string;
  ilike?: string;
  regex?: string;
  iregex?: string;
  is?: IsFilter;
};

export type FloatFilter = {
  eq?: number;
  gt?: number;
  gte?: number;
  in?: number[];
  lt?: number;
  lte?: number;
  neq?: number;
  is?: IsFilter;
};

/**
 * Always use a DateFilter in the variables of a query, and never directly in the query.
 *
 * Because pg_graphql only works with ISO strings if it is passed to variables.
 */
export type DateFilter = {
  eq?: string;
  gt?: string;
  gte?: string;
  in?: string[];
  lt?: string;
  lte?: string;
  neq?: string;
  is?: IsFilter;
};

export type CurrencyFilter = {
  amountMicros?: FloatFilter;
};

export type URLFilter = {
  url?: StringFilter;
  label?: StringFilter;
};

export type FullNameFilter = {
  firstName?: StringFilter;
  lastName?: StringFilter;
};

export type LeafFilter =
  | UUIDFilter
  | StringFilter
  | FloatFilter
  | DateFilter
  | CurrencyFilter
  | URLFilter
  | FullNameFilter
  | BooleanFilter;

export type AndObjectRecordFilter = {
  and?: ObjectRecordQueryFilter[];
};

export type OrObjectRecordFilter = {
  or?: ObjectRecordQueryFilter[] | ObjectRecordQueryFilter;
};

export type NotObjectRecordFilter = {
  not?: ObjectRecordQueryFilter;
};

export type LeafObjectRecordFilter = {
  [fieldName: string]: LeafFilter;
};

export type ObjectRecordQueryFilter =
  | LeafObjectRecordFilter
  | AndObjectRecordFilter
  | OrObjectRecordFilter
  | NotObjectRecordFilter;
