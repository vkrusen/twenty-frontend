import { atom } from 'recoil';

import { OptimisticEffect } from '../types/internal/OptimisticEffect';

export const optimisticEffectState = atom<Record<string, OptimisticEffect>>({
  key: 'optimisticEffectState',
  default: {},
});
