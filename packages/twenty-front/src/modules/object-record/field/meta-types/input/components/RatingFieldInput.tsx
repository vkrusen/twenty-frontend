import { RatingInput } from '@/ui/field/input/components/RatingInput';

import { usePersistField } from '../../../hooks/usePersistField';
import { useRatingField } from '../../hooks/useRatingField';

import { FieldInputEvent } from './DateFieldInput';

export type RatingFieldInputProps = {
  onSubmit?: FieldInputEvent;
  readonly?: boolean;
};

export const RatingFieldInput = ({
  onSubmit,
  readonly,
}: RatingFieldInputProps) => {
  const { rating } = useRatingField();

  const persistField = usePersistField();

  const handleChange = (newRating: number) => {
    onSubmit?.(() => persistField(`${newRating}`));
  };

  return (
    <RatingInput value={rating} onChange={handleChange} readonly={readonly} />
  );
};
