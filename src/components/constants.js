/* eslint-disable import/prefer-default-export */
import { create as createEnum } from '../../utils/enum';

const EASING_DEFAULT = 'EASE_IN_OUT';
export const easing = createEnum({
  LINEAR: 'linear',
  EASE: 'ease',
  EASE_IN: 'ease-in',
  EASE_OUT: 'ease-out',
  [EASING_DEFAULT]: 'ease-in-out'
}, EASING_DEFAULT);
