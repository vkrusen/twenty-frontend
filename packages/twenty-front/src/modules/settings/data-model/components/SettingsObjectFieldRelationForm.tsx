import styled from '@emotion/styled';

import { useObjectMetadataItemForSettings } from '@/object-metadata/hooks/useObjectMetadataItemForSettings';
import { validateMetadataLabel } from '@/object-metadata/utils/validateMetadataLabel';
import { useIcons } from '@/ui/display/icon/hooks/useIcons';
import { IconPicker } from '@/ui/input/components/IconPicker';
import { Select } from '@/ui/input/components/Select';
import { TextInput } from '@/ui/input/components/TextInput';
import { Field } from '~/generated-metadata/graphql';

import { relationTypes } from '../constants/relationTypes';
import { RelationType } from '../types/RelationType';

export type SettingsObjectFieldRelationFormValues = {
  field: Pick<Field, 'icon' | 'label'>;
  objectMetadataId: string;
  type: RelationType;
};

type SettingsObjectFieldRelationFormProps = {
  disableFieldEdition?: boolean;
  disableRelationEdition?: boolean;
  onChange: (values: Partial<SettingsObjectFieldRelationFormValues>) => void;
  values: SettingsObjectFieldRelationFormValues;
};

const StyledContainer = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
`;

const StyledSelectsContainer = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing(4)};
  grid-template-columns: 1fr 1fr;
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledInputsLabel = styled.span`
  color: ${({ theme }) => theme.font.color.light};
  display: block;
  font-size: ${({ theme }) => theme.font.size.xs};
  font-weight: ${({ theme }) => theme.font.weight.semiBold};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
  text-transform: uppercase;
`;

const StyledInputsContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing(2)};
  width: 100%;
`;

export const SettingsObjectFieldRelationForm = ({
  disableFieldEdition,
  disableRelationEdition,
  onChange,
  values,
}: SettingsObjectFieldRelationFormProps) => {
  const { getIcon } = useIcons();
  const { objectMetadataItems, findObjectMetadataItemById } =
    useObjectMetadataItemForSettings();

  const selectedObjectMetadataItem =
    (values.objectMetadataId
      ? findObjectMetadataItemById(values.objectMetadataId)
      : undefined) || objectMetadataItems[0];

  return (
    <StyledContainer>
      <StyledSelectsContainer>
        <Select
          label="Relation type"
          dropdownScopeId="relation-type-select"
          fullWidth
          disabled={disableRelationEdition}
          value={values.type}
          options={Object.entries(relationTypes).map(
            ([value, { label, Icon }]) => ({
              label,
              value: value as RelationType,
              Icon,
            }),
          )}
          onChange={(value) => onChange({ type: value })}
        />
        <Select
          label="Object destination"
          dropdownScopeId="object-destination-select"
          fullWidth
          disabled={disableRelationEdition}
          value={values.objectMetadataId}
          options={objectMetadataItems
            .filter((objectMetadataItem) => !objectMetadataItem.isSystem)
            .map((objectMetadataItem) => ({
              label: objectMetadataItem.labelPlural,
              value: objectMetadataItem.id,
              Icon: getIcon(objectMetadataItem.icon),
            }))}
          onChange={(value) => onChange({ objectMetadataId: value })}
        />
      </StyledSelectsContainer>
      <StyledInputsLabel>
        Field on {selectedObjectMetadataItem?.labelPlural}
      </StyledInputsLabel>
      <StyledInputsContainer>
        <IconPicker
          disabled={disableFieldEdition}
          dropdownScopeId="field-destination-icon-picker"
          selectedIconKey={values.field.icon || undefined}
          onChange={(value) =>
            onChange({
              field: { ...values.field, icon: value.iconKey },
            })
          }
          variant="primary"
        />
        <TextInput
          disabled={disableFieldEdition}
          placeholder="Field name"
          value={values.field.label}
          onChange={(value) => {
            if (!value || validateMetadataLabel(value)) {
              onChange({
                field: { ...values.field, label: value },
              });
            }
          }}
          fullWidth
        />
      </StyledInputsContainer>
    </StyledContainer>
  );
};
