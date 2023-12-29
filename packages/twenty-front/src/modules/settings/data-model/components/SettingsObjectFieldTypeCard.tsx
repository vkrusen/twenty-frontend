import { ReactNode } from 'react';
import styled from '@emotion/styled';

import { Card } from '@/ui/layout/card/components/Card';
import { CardContent } from '@/ui/layout/card/components/CardContent';

type SettingsObjectFieldTypeCardProps = {
  className?: string;
  preview: ReactNode;
  form?: ReactNode;
};

const StyledCard = styled(Card)``;

const StyledPreviewContainer = styled(CardContent)`
  background-color: ${({ theme }) => theme.background.transparent.lighter};
`;

const StyledTitle = styled.h3`
  color: ${({ theme }) => theme.font.color.extraLight};
  font-size: ${({ theme }) => theme.font.size.sm};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  margin: 0;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledPreviewContent = styled.div`
  display: flex;
  gap: 6px;
`;

const StyledFormContainer = styled(CardContent)`
  padding: 0;
`;

export const SettingsObjectFieldTypeCard = ({
  className,
  preview,
  form,
}: SettingsObjectFieldTypeCardProps) => {
  return (
    <StyledCard className={className}>
      <StyledPreviewContainer divider={!!form}>
        <StyledTitle>Preview</StyledTitle>
        <StyledPreviewContent>{preview}</StyledPreviewContent>
      </StyledPreviewContainer>
      {!!form && <StyledFormContainer>{form}</StyledFormContainer>}
    </StyledCard>
  );
};
