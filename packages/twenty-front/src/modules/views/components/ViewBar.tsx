import { ReactNode } from 'react';

import { ObjectFilterDropdownButton } from '@/object-record/object-filter-dropdown/components/ObjectFilterDropdownButton';
import { FiltersHotkeyScope } from '@/object-record/object-filter-dropdown/types/FiltersHotkeyScope';
import { ObjectSortDropdownButton } from '@/object-record/object-sort-dropdown/components/ObjectSortDropdownButton';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { TopBar } from '@/ui/layout/top-bar/TopBar';
import { ViewBarFilterEffect } from '@/views/components/ViewBarFilterEffect';
import { ViewBarSortEffect } from '@/views/components/ViewBarSortEffect';
import { useViewBar } from '@/views/hooks/useViewBar';
import { ViewScope } from '@/views/scopes/ViewScope';
import { ViewField } from '@/views/types/ViewField';
import { ViewFilter } from '@/views/types/ViewFilter';
import { ViewSort } from '@/views/types/ViewSort';

import { ViewsHotkeyScope } from '../types/ViewsHotkeyScope';

import { UpdateViewButtonGroup } from './UpdateViewButtonGroup';
import { ViewBarDetails } from './ViewBarDetails';
import { ViewBarEffect } from './ViewBarEffect';
import { ViewsDropdownButton } from './ViewsDropdownButton';

export type ViewBarProps = {
  viewBarId: string;
  className?: string;
  optionsDropdownButton: ReactNode;
  optionsDropdownScopeId: string;
  onViewSortsChange?: (sorts: ViewSort[]) => void | Promise<void>;
  onViewFiltersChange?: (filters: ViewFilter[]) => void | Promise<void>;
  onViewFieldsChange?: (fields: ViewField[]) => void | Promise<void>;
};

export const ViewBar = ({
  viewBarId,
  className,
  optionsDropdownButton,
  optionsDropdownScopeId,
  onViewFieldsChange,
  onViewFiltersChange,
  onViewSortsChange,
}: ViewBarProps) => {
  const { openDropdown: openOptionsDropdownButton } = useDropdown({
    dropdownScopeId: optionsDropdownScopeId,
  });
  const { upsertViewSort, upsertViewFilter } = useViewBar({
    viewBarId: viewBarId,
  });

  const filterDropdownId = 'view-filter';
  const sortDropdownId = 'view-sort';

  return (
    <ViewScope
      viewScopeId={viewBarId}
      onViewFieldsChange={onViewFieldsChange}
      onViewFiltersChange={onViewFiltersChange}
      onViewSortsChange={onViewSortsChange}
    >
      <ViewBarEffect />
      <ViewBarFilterEffect
        filterDropdownId={filterDropdownId}
        onFilterSelect={upsertViewFilter}
      />
      <ViewBarSortEffect
        sortDropdownId={sortDropdownId}
        onSortSelect={upsertViewSort}
      />

      <TopBar
        className={className}
        leftComponent={
          <ViewsDropdownButton
            onViewEditModeChange={openOptionsDropdownButton}
            hotkeyScope={{ scope: ViewsHotkeyScope.ListDropdown }}
            optionsDropdownScopeId={optionsDropdownScopeId}
          />
        }
        displayBottomBorder={false}
        rightComponent={
          <>
            <ObjectFilterDropdownButton
              filterDropdownId={filterDropdownId}
              hotkeyScope={{
                scope: FiltersHotkeyScope.ObjectFilterDropdownButton,
              }}
            />
            <ObjectSortDropdownButton
              sortDropdownId={sortDropdownId}
              hotkeyScope={{
                scope: FiltersHotkeyScope.ObjectSortDropdownButton,
              }}
            />
            {optionsDropdownButton}
          </>
        }
        bottomComponent={
          <ViewBarDetails
            filterDropdownId={filterDropdownId}
            hasFilterButton
            viewBarId={viewBarId}
            rightComponent={
              <UpdateViewButtonGroup
                onViewEditModeChange={openOptionsDropdownButton}
                hotkeyScope={{ scope: ViewsHotkeyScope.CreateDropdown }}
              />
            }
          />
        }
      />
    </ViewScope>
  );
};
