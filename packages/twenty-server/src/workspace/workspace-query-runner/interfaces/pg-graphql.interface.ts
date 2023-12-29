import { Record as IRecord } from 'src/workspace/workspace-query-builder/interfaces/record.interface';

export interface PGGraphQLResponse<Data = any> {
  resolve: {
    data: Data;
    errors: any[];
  };
}

export type PGGraphQLResult<Data = any> = [PGGraphQLResponse<Data>];

export interface PGGraphQLMutation<Record = IRecord> {
  affectedRows: number;
  records: Record[];
}
