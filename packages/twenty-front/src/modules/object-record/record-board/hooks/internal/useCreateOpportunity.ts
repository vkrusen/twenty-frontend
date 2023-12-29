import { useRecoilCallback } from 'recoil';
import { v4 } from 'uuid';

import { useCreateOneRecord } from '@/object-record/hooks/useCreateOneRecord';
import { recordBoardCardIdsByColumnIdFamilyState } from '@/object-record/record-board/states/recordBoardCardIdsByColumnIdFamilyState';
import { Opportunity } from '@/pipeline/types/Opportunity';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';

export const useCreateOpportunity = () => {
  const { createOneRecord: createOneOpportunity } =
    useCreateOneRecord<Opportunity>({
      objectNameSingular: CoreObjectNameSingular.Opportunity,
    });

  const createOpportunity = useRecoilCallback(
    ({ set }) =>
      async (companyId: string, pipelineStepId: string) => {
        const newUuid = v4();

        set(
          recordBoardCardIdsByColumnIdFamilyState(pipelineStepId),
          (oldValue) => [...oldValue, newUuid],
        );

        await createOneOpportunity?.({
          id: newUuid,
          pipelineStepId,
          companyId: companyId,
        });
      },
    [createOneOpportunity],
  );

  return createOpportunity;
};
