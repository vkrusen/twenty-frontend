import { useMemo, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useRecoilValue } from 'recoil';

import { useOpenActivityRightDrawer } from '@/activities/hooks/useOpenActivityRightDrawer';
import { Activity } from '@/activities/types/Activity';
import { Company } from '@/companies/types/Company';
import { useKeyboardShortcutMenu } from '@/keyboard-shortcut-menu/hooks/useKeyboardShortcutMenu';
import { useFindManyRecords } from '@/object-record/hooks/useFindManyRecords';
import { Person } from '@/people/types/Person';
import { IconNotes } from '@/ui/display/icon';
import { SelectableItem } from '@/ui/layout/selectable-list/components/SelectableItem';
import { SelectableList } from '@/ui/layout/selectable-list/components/SelectableList';
import { useScopedHotkeys } from '@/ui/utilities/hotkey/hooks/useScopedHotkeys';
import { AppHotkeyScope } from '@/ui/utilities/hotkey/types/AppHotkeyScope';
import { useListenClickOutside } from '@/ui/utilities/pointer-event/hooks/useListenClickOutside';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { ScrollWrapper } from '@/ui/utilities/scroll/components/ScrollWrapper';
import { Avatar } from '@/users/components/Avatar';
import { getLogoUrlFromDomainName } from '~/utils';

import { useCommandMenu } from '../hooks/useCommandMenu';
import { commandMenuCommandsState } from '../states/commandMenuCommandsState';
import { isCommandMenuOpenedState } from '../states/isCommandMenuOpenedState';
import { Command, CommandType } from '../types/Command';

import { CommandGroup } from './CommandGroup';
import { CommandMenuItem } from './CommandMenuItem';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';

export const StyledDialog = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: ${({ theme }) => theme.border.radius.md};
  box-shadow: ${({ theme }) => theme.boxShadow.superHeavy};
  font-family: ${({ theme }) => theme.font.family};
  left: 50%;
  max-width: 640px;
  overflow: hidden;
  padding: 0;
  position: fixed;
  top: 30%;
  transform: ${() =>
    useIsMobile() ? 'translateX(-49.5%)' : 'translateX(-50%)'};
  width: ${() => (useIsMobile() ? 'calc(100% - 40px)' : '100%')};
  z-index: 1000;
`;

export const StyledInput = styled.input`
  background: ${({ theme }) => theme.background.secondary};
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.border.color.medium};
  border-radius: 0;
  color: ${({ theme }) => theme.font.color.primary};
  font-size: ${({ theme }) => theme.font.size.lg};
  margin: 0;
  outline: none;
  padding: ${({ theme }) => theme.spacing(5)};
  width: ${({ theme }) => `calc(100% - ${theme.spacing(10)})`};

  &::placeholder {
    color: ${({ theme }) => theme.font.color.light};
  }
`;

const StyledCancelText = styled.span`
  color: ${({ theme }) => theme.font.color.tertiary};
  font-size: ${({ theme }) => theme.font.size.sm};
  margin-right: 12px;
  margin-top: 6px;
  position: absolute;
  right: 0;
  top: 0;
`;

export const StyledList = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  height: 400px;
  max-height: 400px;
  overscroll-behavior: contain;
  transition: 100ms ease;
  transition-property: height;
`;

export const StyledInnerList = styled.div`
  padding-left: ${({ theme }) => theme.spacing(1)};
  width: 100%;
`;

export const StyledEmpty = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.font.color.light};
  display: flex;
  font-size: ${({ theme }) => theme.font.size.md};
  height: 64px;
  justify-content: center;
  white-space: pre-wrap;
`;

export const CommandMenu = () => {
  const { toggleCommandMenu, onItemClick, closeCommandMenu } = useCommandMenu();
  const commandMenuRef = useRef<HTMLDivElement>(null);

  const openActivityRightDrawer = useOpenActivityRightDrawer();
  const isCommandMenuOpened = useRecoilValue(isCommandMenuOpenedState);
  const [search, setSearch] = useState('');
  const commandMenuCommands = useRecoilValue(commandMenuCommandsState);
  const { closeKeyboardShortcutMenu } = useKeyboardShortcutMenu();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useScopedHotkeys(
    'ctrl+k,meta+k',
    () => {
      closeKeyboardShortcutMenu();
      setSearch('');
      toggleCommandMenu();
    },
    AppHotkeyScope.CommandMenu,
    [toggleCommandMenu, setSearch],
  );

  useScopedHotkeys(
    'esc',
    () => {
      closeCommandMenu();
    },
    AppHotkeyScope.CommandMenuOpen,
    [closeCommandMenu],
  );

  const { records: people } = useFindManyRecords<Person>({
    skip: !isCommandMenuOpened,
    objectNameSingular: CoreObjectNameSingular.Person,
    filter: {
      or: [
        { name: { firstName: { ilike: `%${search}%` } } },
        { name: { firstName: { ilike: `%${search}%` } } },
      ],
    },
    limit: 3,
  });

  const { records: companies } = useFindManyRecords<Company>({
    skip: !isCommandMenuOpened,
    objectNameSingular: CoreObjectNameSingular.Company,
    filter: {
      name: { ilike: `%${search}%` },
    },
    limit: 3,
  });

  const { records: activities } = useFindManyRecords<Activity>({
    skip: !isCommandMenuOpened,
    objectNameSingular: CoreObjectNameSingular.Activity,
    filter: {
      or: [
        { title: { like: `%${search}%` } },
        { body: { like: `%${search}%` } },
      ],
    },
    limit: 3,
  });

  const peopleCommands = useMemo(
    () =>
      people.map(({ id, name: { firstName, lastName } }) => ({
        id,
        label: `${firstName} ${lastName}`,
        to: `object/person/${id}`,
      })),
    [people],
  );

  const companyCommands = useMemo(
    () =>
      companies.map(({ id, name }) => ({
        id,
        label: name ?? '',
        to: `object/company/${id}`,
      })),
    [companies],
  );

  const activityCommands = useMemo(
    () =>
      activities.map(({ id, title }) => ({
        id,
        label: title ?? '',
        to: '',
        onCommandClick: () => openActivityRightDrawer(id),
      })),
    [activities, openActivityRightDrawer],
  );

  const otherCommands = useMemo(() => {
    return [
      ...peopleCommands,
      ...companyCommands,
      ...activityCommands,
    ] as Command[];
  }, [peopleCommands, companyCommands, activityCommands]);

  const checkInShortcuts = (cmd: Command, search: string) => {
    return (cmd.firstHotKey + (cmd.secondHotKey ?? ''))
      .toLowerCase()
      .includes(search.toLowerCase());
  };

  const checkInLabels = (cmd: Command, search: string) => {
    if (cmd.label) {
      return cmd.label.toLowerCase().includes(search.toLowerCase());
    }
    return false;
  };

  const matchingNavigateCommand = commandMenuCommands.filter(
    (cmd) =>
      (search.length > 0
        ? checkInShortcuts(cmd, search) || checkInLabels(cmd, search)
        : true) && cmd.type === CommandType.Navigate,
  );

  const matchingCreateCommand = commandMenuCommands.filter(
    (cmd) =>
      (search.length > 0
        ? checkInShortcuts(cmd, search) || checkInLabels(cmd, search)
        : true) && cmd.type === CommandType.Create,
  );

  useListenClickOutside({
    refs: [commandMenuRef],
    callback: closeCommandMenu,
  });

  const selectableItemIds = matchingCreateCommand
    .map((cmd) => cmd.id)
    .concat(matchingNavigateCommand.map((cmd) => cmd.id))
    .concat(people.map((person) => person.id))
    .concat(companies.map((company) => company.id))
    .concat(activities.map((activity) => activity.id));

  return (
    <>
      {isCommandMenuOpened && (
        <StyledDialog ref={commandMenuRef}>
          <StyledInput
            autoFocus
            value={search}
            placeholder="Search"
            onChange={handleSearchChange}
          />
          <StyledCancelText>Esc to cancel</StyledCancelText>
          <StyledList>
            <ScrollWrapper>
              <StyledInnerList>
                <SelectableList
                  selectableListId="command-menu-list"
                  selectableItemIdArray={selectableItemIds}
                  hotkeyScope={AppHotkeyScope.CommandMenu}
                  onEnter={(itemId) => {
                    const command = [
                      ...commandMenuCommands,
                      ...otherCommands,
                    ].find((cmd) => cmd.id === itemId);

                    if (command) {
                      const { to, onCommandClick } = command;
                      onItemClick(onCommandClick, to);
                    }
                  }}
                >
                  {!matchingCreateCommand.length &&
                    !matchingNavigateCommand.length &&
                    !people.length &&
                    !companies.length &&
                    !activities.length && (
                      <StyledEmpty>No results found</StyledEmpty>
                    )}
                  <CommandGroup heading="Create">
                    {matchingCreateCommand.map((cmd) => (
                      <SelectableItem itemId={cmd.id} key={cmd.id}>
                        <CommandMenuItem
                          id={cmd.id}
                          to={cmd.to}
                          key={cmd.id}
                          Icon={cmd.Icon}
                          label={cmd.label}
                          onClick={cmd.onCommandClick}
                          firstHotKey={cmd.firstHotKey}
                          secondHotKey={cmd.secondHotKey}
                        />
                      </SelectableItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading="Navigate">
                    {matchingNavigateCommand.map((cmd) => (
                      <SelectableItem itemId={cmd.id} key={cmd.id}>
                        <CommandMenuItem
                          id={cmd.id}
                          to={cmd.to}
                          key={cmd.id}
                          label={cmd.label}
                          Icon={cmd.Icon}
                          onClick={cmd.onCommandClick}
                          firstHotKey={cmd.firstHotKey}
                          secondHotKey={cmd.secondHotKey}
                        />
                      </SelectableItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading="People">
                    {people.map((person) => (
                      <SelectableItem itemId={person.id} key={person.id}>
                        <CommandMenuItem
                          id={person.id}
                          key={person.id}
                          to={`object/person/${person.id}`}
                          label={
                            person.name.firstName + ' ' + person.name.lastName
                          }
                          Icon={() => (
                            <Avatar
                              type="rounded"
                              avatarUrl={null}
                              colorId={person.id}
                              placeholder={
                                person.name.firstName +
                                ' ' +
                                person.name.lastName
                              }
                            />
                          )}
                        />
                      </SelectableItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading="Companies">
                    {companies.map((company) => (
                      <SelectableItem itemId={company.id} key={company.id}>
                        <CommandMenuItem
                          id={company.id}
                          key={company.id}
                          label={company.name}
                          to={`object/company/${company.id}`}
                          Icon={() => (
                            <Avatar
                              colorId={company.id}
                              placeholder={company.name}
                              avatarUrl={getLogoUrlFromDomainName(
                                company.domainName,
                              )}
                            />
                          )}
                        />
                      </SelectableItem>
                    ))}
                  </CommandGroup>
                  <CommandGroup heading="Notes">
                    {activities.map((activity) => (
                      <SelectableItem itemId={activity.id} key={activity.id}>
                        <CommandMenuItem
                          id={activity.id}
                          Icon={IconNotes}
                          key={activity.id}
                          label={activity.title ?? ''}
                          onClick={() => openActivityRightDrawer(activity.id)}
                        />
                      </SelectableItem>
                    ))}
                  </CommandGroup>
                </SelectableList>
              </StyledInnerList>
            </ScrollWrapper>
          </StyledList>
        </StyledDialog>
      )}
    </>
  );
};
