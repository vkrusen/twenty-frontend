import { useEffect } from 'react';

import { useObjectMetadataItem } from '@/object-metadata/hooks/useObjectMetadataItem';
import { useObjectNameSingularFromPlural } from '@/object-metadata/hooks/useObjectNameSingularFromPlural';
import { useRecordTableContextMenuEntries } from '@/object-record/hooks/useRecordTableContextMenuEntries';
import { useRecordTable } from '@/object-record/record-table/hooks/useRecordTable';
import { filterAvailableTableColumns } from '@/object-record/utils/filterAvailableTableColumns';
import {
  signInBackgroundMockColumnDefinitions,
  signInBackgroundMockFilterDefinitions,
  signInBackgroundMockSortDefinitions,
} from '@/sign-in-background-mock/constants/signInBackgroundMockDefinitions';
import { signInBackgroundMockViewFields } from '@/sign-in-background-mock/constants/signInBackgroundMockViewFields';
import { useViewBar } from '@/views/hooks/useViewBar';
import { ViewType } from '@/views/types/ViewType';
import { mapViewFieldsToColumnDefinitions } from '@/views/utils/mapViewFieldsToColumnDefinitions';

type SignInBackgroundMockContainerEffectProps = {
  recordTableId: string;
  viewId: string;
};

export const SignInBackgroundMockContainerEffect = ({
  recordTableId,
  viewId,
}: SignInBackgroundMockContainerEffectProps) => {
  const {
    scopeId: objectNamePlural,
    setAvailableTableColumns,
    setOnEntityCountChange,
    setRecordTableData,
    setTableColumns,
    setObjectMetadataConfig,
  } = useRecordTable({
    recordTableScopeId: recordTableId,
  });

  const { objectNameSingular } = useObjectNameSingularFromPlural({
    objectNamePlural,
  });

  const { objectMetadataItem } = useObjectMetadataItem({
    objectNameSingular,
  });

  const {
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    setViewType,
    setViewObjectMetadataId,
    setEntityCountInCurrentView,
  } = useViewBar({ viewBarId: viewId });

  useEffect(() => {
    setViewObjectMetadataId?.(objectMetadataItem.id);
    setViewType?.(ViewType.Table);

    setAvailableSortDefinitions?.(signInBackgroundMockSortDefinitions);
    setAvailableFilterDefinitions?.(signInBackgroundMockFilterDefinitions);
    setAvailableFieldDefinitions?.(signInBackgroundMockColumnDefinitions);

    const availableTableColumns = signInBackgroundMockColumnDefinitions.filter(
      filterAvailableTableColumns,
    );

    setAvailableTableColumns(availableTableColumns);

    setTableColumns(
      mapViewFieldsToColumnDefinitions(
        signInBackgroundMockViewFields,
        signInBackgroundMockColumnDefinitions,
      ),
    );
  }, [
    setViewObjectMetadataId,
    setViewType,
    setAvailableSortDefinitions,
    setAvailableFilterDefinitions,
    setAvailableFieldDefinitions,
    objectMetadataItem,
    setAvailableTableColumns,
    setRecordTableData,
    setTableColumns,
  ]);

  useEffect(() => {
    setObjectMetadataConfig?.(mockIdentifier);
  }, [setObjectMetadataConfig]);

  const { setActionBarEntries, setContextMenuEntries } =
    useRecordTableContextMenuEntries({
      recordTableScopeId: recordTableId,
    });

  useEffect(() => {
    setActionBarEntries?.();
    setContextMenuEntries?.();
  }, [setActionBarEntries, setContextMenuEntries]);

  useEffect(() => {
    setOnEntityCountChange(
      () => (entityCount: number) => setEntityCountInCurrentView(entityCount),
    );
  }, [setEntityCountInCurrentView, setOnEntityCountChange]);

  return <></>;
};

const mockIdentifier = {
  basePathToShowPage: '/object/company/',
  labelIdentifierFieldMetadataId: '20202020-6d30-4111-9f40-b4301906fd3c',
};
