import { useEffect } from 'react';
import { Decorator, Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from '@storybook/test';

import { useSetHotkeyScope } from '@/ui/utilities/hotkey/hooks/useSetHotkeyScope';
import { FieldMetadataType } from '~/generated-metadata/graphql';

import { FieldRatingValue } from '../../../../types/FieldMetadata';
import { FieldContextProvider } from '../../../__stories__/FieldContextProvider';
import { useRatingField } from '../../../hooks/useRatingField';
import { RatingFieldInput, RatingFieldInputProps } from '../RatingFieldInput';

const RatingFieldValueSetterEffect = ({
  value,
}: {
  value: FieldRatingValue;
}) => {
  const { setFieldValue } = useRatingField();

  useEffect(() => {
    setFieldValue(value);
  }, [setFieldValue, value]);

  return <></>;
};

type RatingFieldInputWithContextProps = RatingFieldInputProps & {
  value: FieldRatingValue;
  entityId?: string;
};

const RatingFieldInputWithContext = ({
  entityId,
  value,
  onSubmit,
}: RatingFieldInputWithContextProps) => {
  const setHotKeyScope = useSetHotkeyScope();

  useEffect(() => {
    setHotKeyScope('hotkey-scope');
  }, [setHotKeyScope]);

  return (
    <FieldContextProvider
      fieldDefinition={{
        fieldMetadataId: 'rating',
        label: 'Rating',
        type: FieldMetadataType.Rating,
        iconName: 'Icon123',
        metadata: {
          fieldName: 'Rating',
        },
      }}
      entityId={entityId}
    >
      <RatingFieldValueSetterEffect value={value} />
      <RatingFieldInput onSubmit={onSubmit} />
    </FieldContextProvider>
  );
};

const submitJestFn = fn();

const clearMocksDecorator: Decorator = (Story, context) => {
  if (context.parameters.clearMocks) {
    submitJestFn.mockClear();
  }
  return <Story />;
};

const meta: Meta = {
  title: 'UI/Data/Field/Input/RatingFieldInput',
  component: RatingFieldInputWithContext,
  args: {
    value: '3',
    onSubmit: submitJestFn,
  },
  argTypes: {
    onSubmit: { control: false },
  },
  decorators: [clearMocksDecorator],
  parameters: {
    clearMocks: true,
  },
};

export default meta;

type Story = StoryObj<typeof RatingFieldInputWithContext>;

export const Default: Story = {};

export const Submit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    expect(submitJestFn).toHaveBeenCalledTimes(0);

    const input = canvas.getByRole('slider', { name: 'Rating' });
    const firstStar = input.firstElementChild;

    await waitFor(() => {
      if (firstStar) {
        userEvent.click(firstStar);
        expect(submitJestFn).toHaveBeenCalledTimes(1);
      }
    });
  },
};
