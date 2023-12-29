import { useRecoilCallback } from 'recoil';

import { ActivityType } from '@/activities/types/Activity';
import { selectedRowIdsSelector } from '@/object-record/record-table/states/selectors/selectedRowIdsSelector';

import {
  ActivityTargetableEntity,
  ActivityTargetableEntityType,
} from '../types/ActivityTargetableEntity';

import { useOpenCreateActivityDrawer } from './useOpenCreateActivityDrawer';

export const useOpenCreateActivityDrawerForSelectedRowIds = () => {
  const openCreateActivityDrawer = useOpenCreateActivityDrawer();

  return useRecoilCallback(
    ({ snapshot }) =>
      (
        type: ActivityType,
        entityType: ActivityTargetableEntityType,
        relatedEntities?: ActivityTargetableEntity[],
      ) => {
        const selectedRowIds = snapshot
          .getLoadable(selectedRowIdsSelector)
          .getValue();
        let activityTargetableEntityArray: ActivityTargetableEntity[] =
          selectedRowIds.map((id: string) => ({
            type: entityType,
            id,
          }));
        if (relatedEntities) {
          activityTargetableEntityArray =
            activityTargetableEntityArray.concat(relatedEntities);
        }
        openCreateActivityDrawer({
          type,
          targetableEntities: activityTargetableEntityArray,
        });
      },
    [openCreateActivityDrawer],
  );
};
