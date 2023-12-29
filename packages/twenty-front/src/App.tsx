import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { RecordShowPage } from '@/object-record/components/RecordShowPage';
import { RecordTablePage } from '@/object-record/components/RecordTablePage';
import { AppPath } from '@/types/AppPath';
import { SettingsPath } from '@/types/SettingsPath';
import { DefaultLayout } from '@/ui/layout/page/DefaultLayout';
import { PageTitle } from '@/ui/utilities/page-title/PageTitle';
import { CommandMenuEffect } from '~/effect-components/CommandMenuEffect';
import { GotoHotkeysEffect } from '~/effect-components/GotoHotkeysEffect';
import { CreateProfile } from '~/pages/auth/CreateProfile';
import { CreateWorkspace } from '~/pages/auth/CreateWorkspace';
import { PlanRequired } from '~/pages/auth/PlanRequired';
import { SignInUp } from '~/pages/auth/SignInUp';
import { VerifyEffect } from '~/pages/auth/VerifyEffect';
import { ImpersonateEffect } from '~/pages/impersonate/ImpersonateEffect';
import { NotFound } from '~/pages/not-found/NotFound';
import { Opportunities } from '~/pages/opportunities/Opportunities';
import { SettingsAccounts } from '~/pages/settings/accounts/SettingsAccounts';
import { SettingsAccountsEmails } from '~/pages/settings/accounts/SettingsAccountsEmails';
import { SettingsAccountsEmailsInboxSettings } from '~/pages/settings/accounts/SettingsAccountsEmailsInboxSettings';
import { SettingsNewAccount } from '~/pages/settings/accounts/SettingsNewAccount';
import { SettingsNewObject } from '~/pages/settings/data-model/SettingsNewObject';
import { SettingsObjectDetail } from '~/pages/settings/data-model/SettingsObjectDetail';
import { SettingsObjectEdit } from '~/pages/settings/data-model/SettingsObjectEdit';
import { SettingsObjectFieldEdit } from '~/pages/settings/data-model/SettingsObjectFieldEdit';
import { SettingsObjectNewFieldStep1 } from '~/pages/settings/data-model/SettingsObjectNewField/SettingsObjectNewFieldStep1';
import { SettingsObjectNewFieldStep2 } from '~/pages/settings/data-model/SettingsObjectNewField/SettingsObjectNewFieldStep2';
import { SettingsObjects } from '~/pages/settings/data-model/SettingsObjects';
import { SettingsDevelopersApiKeyDetail } from '~/pages/settings/developers/api-keys/SettingsDevelopersApiKeyDetail';
import { SettingsDevelopersApiKeys } from '~/pages/settings/developers/api-keys/SettingsDevelopersApiKeys';
import { SettingsDevelopersApiKeysNew } from '~/pages/settings/developers/api-keys/SettingsDevelopersApiKeysNew';
import { SettingsAppearance } from '~/pages/settings/SettingsAppearance';
import { SettingsProfile } from '~/pages/settings/SettingsProfile';
import { SettingsWorkspace } from '~/pages/settings/SettingsWorkspace';
import { SettingsWorkspaceMembers } from '~/pages/settings/SettingsWorkspaceMembers';
import { Tasks } from '~/pages/tasks/Tasks';
import { getPageTitleFromPath } from '~/utils/title-utils';

export const App = () => {
  const { pathname } = useLocation();
  const pageTitle = getPageTitleFromPath(pathname);
  return (
    <>
      <PageTitle title={pageTitle} />
      <GotoHotkeysEffect />
      <CommandMenuEffect />
      <DefaultLayout>
        <Routes>
          <Route path={AppPath.Verify} element={<VerifyEffect />} />
          <Route path={AppPath.SignIn} element={<SignInUp />} />
          <Route path={AppPath.SignUp} element={<SignInUp />} />
          <Route path={AppPath.Invite} element={<SignInUp />} />
          <Route path={AppPath.CreateWorkspace} element={<CreateWorkspace />} />
          <Route path={AppPath.CreateProfile} element={<CreateProfile />} />
          <Route path={AppPath.PlanRequired} element={<PlanRequired />} />
          <Route path="/" element={<Navigate to="/objects/companies" />} />
          <Route path={AppPath.TasksPage} element={<Tasks />} />
          <Route path={AppPath.Impersonate} element={<ImpersonateEffect />} />

          <Route path={AppPath.OpportunitiesPage} element={<Opportunities />} />
          <Route path={AppPath.RecordTablePage} element={<RecordTablePage />} />
          <Route path={AppPath.RecordShowPage} element={<RecordShowPage />} />

          <Route
            path={AppPath.SettingsCatchAll}
            element={
              <Routes>
                <Route
                  path={SettingsPath.ProfilePage}
                  element={<SettingsProfile />}
                />
                <Route
                  path={SettingsPath.Appearance}
                  element={<SettingsAppearance />}
                />
                <Route
                  path={SettingsPath.Accounts}
                  element={<SettingsAccounts />}
                />
                <Route
                  path={SettingsPath.NewAccount}
                  element={<SettingsNewAccount />}
                />
                <Route
                  path={SettingsPath.AccountsEmails}
                  element={<SettingsAccountsEmails />}
                />
                <Route
                  path={SettingsPath.AccountsEmailsInboxSettings}
                  element={<SettingsAccountsEmailsInboxSettings />}
                />
                <Route
                  path={SettingsPath.WorkspaceMembersPage}
                  element={<SettingsWorkspaceMembers />}
                />
                <Route
                  path={SettingsPath.Workspace}
                  element={<SettingsWorkspace />}
                />
                <Route
                  path={SettingsPath.Objects}
                  element={<SettingsObjects />}
                />
                <Route
                  path={SettingsPath.ObjectDetail}
                  element={<SettingsObjectDetail />}
                />
                <Route
                  path={SettingsPath.ObjectEdit}
                  element={<SettingsObjectEdit />}
                />
                <Route
                  path={SettingsPath.NewObject}
                  element={<SettingsNewObject />}
                />
                <Route
                  path={AppPath.DevelopersCatchAll}
                  element={
                    <Routes>
                      <Route
                        path={SettingsPath.Developers}
                        element={<SettingsDevelopersApiKeys />}
                      />
                      <Route
                        path={SettingsPath.DevelopersNewApiKey}
                        element={<SettingsDevelopersApiKeysNew />}
                      />
                      <Route
                        path={SettingsPath.DevelopersApiKeyDetail}
                        element={<SettingsDevelopersApiKeyDetail />}
                      />
                    </Routes>
                  }
                />
                <Route
                  path={SettingsPath.ObjectNewFieldStep1}
                  element={<SettingsObjectNewFieldStep1 />}
                />
                <Route
                  path={SettingsPath.ObjectNewFieldStep2}
                  element={<SettingsObjectNewFieldStep2 />}
                />
                <Route
                  path={SettingsPath.ObjectFieldEdit}
                  element={<SettingsObjectFieldEdit />}
                />
              </Routes>
            }
          />
          <Route path={AppPath.NotFoundWildcard} element={<NotFound />} />
        </Routes>
      </DefaultLayout>
    </>
  );
};
