import { useState } from 'react';
import { DeepPartial } from 'react-hook-form';
import { v4 } from 'uuid';
import { z } from 'zod';

import { CurrencyCode } from '@/object-record/field/types/CurrencyCode';
import { themeColorSchema } from '@/ui/theme/utils/themeColorSchema';
import {
  FieldMetadataType,
  RelationMetadataType,
} from '~/generated-metadata/graphql';
import { isDeeplyEqual } from '~/utils/isDeeplyEqual';

import { SettingsObjectFieldTypeSelectSectionFormValues } from '../components/SettingsObjectFieldTypeSelectSection';

type FormValues = {
  description?: string;
  icon: string;
  label: string;
} & SettingsObjectFieldTypeSelectSectionFormValues;

export const fieldMetadataFormDefaultValues: FormValues = {
  icon: 'IconUsers',
  label: '',
  type: FieldMetadataType.Text,
  currency: { currencyCode: CurrencyCode.USD },
  relation: {
    type: RelationMetadataType.OneToMany,
    objectMetadataId: '',
    field: { label: '' },
  },
  select: [{ color: 'green', label: 'Option 1', value: v4() }],
};

const fieldSchema = z.object({
  description: z.string().optional(),
  icon: z.string().startsWith('Icon'),
  label: z.string().min(1),
});

const currencySchema = fieldSchema.merge(
  z.object({
    type: z.literal(FieldMetadataType.Currency),
    currency: z.object({
      currencyCode: z.nativeEnum(CurrencyCode),
    }),
  }),
);

const relationSchema = fieldSchema.merge(
  z.object({
    type: z.literal(FieldMetadataType.Relation),
    relation: z.object({
      field: fieldSchema,
      objectMetadataId: z.string().uuid(),
      type: z.enum([
        RelationMetadataType.OneToMany,
        RelationMetadataType.OneToOne,
        'MANY_TO_ONE',
      ]),
    }),
  }),
);

const selectSchema = fieldSchema.merge(
  z.object({
    type: z.literal(FieldMetadataType.Select),
    select: z
      .array(
        z.object({
          color: themeColorSchema,
          id: z.string().optional(),
          isDefault: z.boolean().optional(),
          label: z.string().min(1),
        }),
      )
      .nonempty(),
  }),
);

const {
  Currency: _Currency,
  Relation: _Relation,
  Select: _Select,
  ...otherFieldTypes
} = FieldMetadataType;

type OtherFieldType = Exclude<
  FieldMetadataType,
  | FieldMetadataType.Currency
  | FieldMetadataType.Relation
  | FieldMetadataType.Select
>;

const otherFieldTypesSchema = fieldSchema.merge(
  z.object({
    type: z.enum(
      Object.values(otherFieldTypes) as [OtherFieldType, ...OtherFieldType[]],
    ),
  }),
);

const schema = z.discriminatedUnion('type', [
  currencySchema,
  relationSchema,
  selectSchema,
  otherFieldTypesSchema,
]);

type PartialFormValues = Partial<Omit<FormValues, 'relation'>> &
  DeepPartial<Pick<FormValues, 'relation'>>;

export const useFieldMetadataForm = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [initialFormValues, setInitialFormValues] = useState<FormValues>(
    fieldMetadataFormDefaultValues,
  );
  const [formValues, setFormValues] = useState<FormValues>(
    fieldMetadataFormDefaultValues,
  );
  const [hasFieldFormChanged, setHasFieldFormChanged] = useState(false);
  const [hasCurrencyFormChanged, setHasCurrencyFormChanged] = useState(false);
  const [hasRelationFormChanged, setHasRelationFormChanged] = useState(false);
  const [hasSelectFormChanged, setHasSelectFormChanged] = useState(false);
  const [validationResult, setValidationResult] = useState(
    schema.safeParse(formValues),
  );

  const mergePartialValues = (
    previousValues: FormValues,
    nextValues: PartialFormValues,
  ): FormValues => ({
    ...previousValues,
    ...nextValues,
    currency: { ...previousValues.currency, ...nextValues.currency },
    relation: {
      ...previousValues.relation,
      ...nextValues.relation,
      field: {
        ...previousValues.relation?.field,
        ...nextValues.relation?.field,
      },
    },
  });

  const initForm = (lazyInitialFormValues: PartialFormValues) => {
    if (isInitialized) return;

    const mergedFormValues = mergePartialValues(
      initialFormValues,
      lazyInitialFormValues,
    );

    setInitialFormValues(mergedFormValues);
    setFormValues(mergedFormValues);
    setValidationResult(schema.safeParse(mergedFormValues));
    setIsInitialized(true);
  };

  const handleFormChange = (values: PartialFormValues) => {
    const nextFormValues = mergePartialValues(formValues, values);

    setFormValues(nextFormValues);
    setValidationResult(schema.safeParse(nextFormValues));

    const {
      currency: initialCurrencyFormValues,
      relation: initialRelationFormValues,
      select: initialSelectFormValues,
      ...initialFieldFormValues
    } = initialFormValues;
    const {
      currency: nextCurrencyFormValues,
      relation: nextRelationFormValues,
      select: nextSelectFormValues,
      ...nextFieldFormValues
    } = nextFormValues;

    setHasFieldFormChanged(
      !isDeeplyEqual(initialFieldFormValues, nextFieldFormValues),
    );
    setHasCurrencyFormChanged(
      nextFieldFormValues.type === FieldMetadataType.Currency &&
        !isDeeplyEqual(initialCurrencyFormValues, nextCurrencyFormValues),
    );
    setHasRelationFormChanged(
      nextFieldFormValues.type === FieldMetadataType.Relation &&
        !isDeeplyEqual(initialRelationFormValues, nextRelationFormValues),
    );
    setHasSelectFormChanged(
      nextFieldFormValues.type === FieldMetadataType.Select &&
        !isDeeplyEqual(initialSelectFormValues, nextSelectFormValues),
    );
  };

  return {
    formValues,
    handleFormChange,
    hasFieldFormChanged,
    hasFormChanged:
      hasFieldFormChanged ||
      hasCurrencyFormChanged ||
      hasRelationFormChanged ||
      hasSelectFormChanged,
    hasRelationFormChanged,
    hasSelectFormChanged,
    initForm,
    isInitialized,
    isValid: validationResult.success,
    validatedFormValues: validationResult.success
      ? validationResult.data
      : undefined,
  };
};
