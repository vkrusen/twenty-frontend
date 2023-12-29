import { useState } from 'react';
import styled from '@emotion/styled';

import { Button } from '@/ui/input/button/components/Button';
import { TextInput } from '@/ui/input/components/TextInput';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 16px;
`;

const StyledLinkContainer = styled.div`
  flex: 1;
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

type SettingsAccountsEmailsBlocklistInputProps = {
  updateBlockedEmailList: (email: string) => void;
};

export const SettingsAccountsEmailsBlocklistInput = ({
  updateBlockedEmailList,
}: SettingsAccountsEmailsBlocklistInputProps) => {
  const [formValues, setFormValues] = useState<{
    email: string;
  }>({
    email: '',
  });
  return (
    <StyledContainer>
      <StyledLinkContainer>
        <TextInput
          placeholder="eddy@gmail.com, @apple.com"
          value={formValues.email}
          onChange={(value) => {
            setFormValues((prevState) => ({
              ...prevState,
              email: value,
            }));
          }}
          fullWidth
        />
      </StyledLinkContainer>
      <Button
        title="Add to blocklist"
        onClick={() => {
          updateBlockedEmailList(formValues.email);
          setFormValues({ email: '' });
        }}
      />
    </StyledContainer>
  );
};
