import { PhoneInput } from '@/ui/field/input/components/PhoneInput';

import { FieldInputOverlay } from '../../../../../ui/field/input/components/FieldInputOverlay';
import { usePhoneField } from '../../hooks/usePhoneField';

import { FieldInputEvent } from './DateFieldInput';

export type PhoneFieldInputProps = {
  onClickOutside?: FieldInputEvent;
  onEnter?: FieldInputEvent;
  onEscape?: FieldInputEvent;
  onTab?: FieldInputEvent;
  onShiftTab?: FieldInputEvent;
};

export const PhoneFieldInput = ({
  onEnter,
  onEscape,
  onClickOutside,
  onTab,
  onShiftTab,
}: PhoneFieldInputProps) => {
  const { fieldDefinition, initialValue, hotkeyScope, persistPhoneField } =
    usePhoneField();

  const handleEnter = (newText: string) => {
    onEnter?.(() => persistPhoneField(newText));
  };

  const handleEscape = (newText: string) => {
    onEscape?.(() => persistPhoneField(newText));
  };

  const handleClickOutside = (
    event: MouseEvent | TouchEvent,
    newText: string,
  ) => {
    onClickOutside?.(() => persistPhoneField(newText));
  };

  const handleTab = (newText: string) => {
    onTab?.(() => persistPhoneField(newText));
  };

  const handleShiftTab = (newText: string) => {
    onShiftTab?.(() => persistPhoneField(newText));
  };

  return (
    <FieldInputOverlay>
      <PhoneInput
        placeholder={fieldDefinition.metadata.placeHolder}
        autoFocus
        value={initialValue}
        onClickOutside={handleClickOutside}
        onEnter={handleEnter}
        onEscape={handleEscape}
        onShiftTab={handleShiftTab}
        onTab={handleTab}
        hotkeyScope={hotkeyScope}
      />
    </FieldInputOverlay>
  );
};
