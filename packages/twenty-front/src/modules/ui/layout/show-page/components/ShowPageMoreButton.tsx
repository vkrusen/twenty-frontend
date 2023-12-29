import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { useDeleteOneRecord } from '@/object-record/hooks/useDeleteOneRecord';
import { PageHotkeyScope } from '@/types/PageHotkeyScope';
import { IconDotsVertical, IconTrash } from '@/ui/display/icon/index';
import { IconButton } from '@/ui/input/button/components/IconButton';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { useDropdown } from '@/ui/layout/dropdown/hooks/useDropdown';
import { MenuItem } from '@/ui/navigation/menu-item/components/MenuItem';
import { navigationMemorizedUrlState } from '@/ui/navigation/states/navigationMemorizedUrlState';

import { Dropdown } from '../../dropdown/components/Dropdown';
import { DropdownMenu } from '../../dropdown/components/DropdownMenu';
import { DropdownScope } from '../../dropdown/scopes/DropdownScope';

const StyledContainer = styled.div`
  z-index: 1;
`;

export const ShowPageMoreButton = ({
  recordId,
  objectNameSingular,
}: {
  recordId: string;
  objectNameSingular: string;
}) => {
  const { closeDropdown, toggleDropdown } = useDropdown({
    dropdownScopeId: 'more-show-page',
  });
  const navigationMemorizedUrl = useRecoilValue(navigationMemorizedUrlState);
  const navigate = useNavigate();

  const { deleteOneRecord: deleteOneRecord } = useDeleteOneRecord({
    objectNameSingular,
  });

  const handleDelete = () => {
    deleteOneRecord(recordId);
    closeDropdown();
    navigate(navigationMemorizedUrl, { replace: true });
  };

  return (
    <StyledContainer>
      <DropdownScope dropdownScopeId="more-show-page">
        <Dropdown
          clickableComponent={
            <IconButton
              Icon={IconDotsVertical}
              size="medium"
              dataTestId="more-showpage-button"
              accent="default"
              variant="secondary"
              onClick={toggleDropdown}
            />
          }
          dropdownComponents={
            <DropdownMenu>
              <DropdownMenuItemsContainer>
                <MenuItem
                  onClick={handleDelete}
                  accent="danger"
                  LeftIcon={IconTrash}
                  text="Delete"
                />
              </DropdownMenuItemsContainer>
            </DropdownMenu>
          }
          dropdownHotkeyScope={{
            scope: PageHotkeyScope.ShowPage,
          }}
        />
      </DropdownScope>
    </StyledContainer>
  );
};
