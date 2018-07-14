import PropTypes from 'prop-types';
import { create as createEnum } from './utils/enum';

/** naming convention: enum like objects names are camelCased with keys uppercased */
export const breakpoints = createEnum({
  EXTRA_SMALL: 'xs',
  SMALL: 'sm'
  // MEDIUM: 'md',
  // LARGE: 'lg',
  // EXTRA_LARGE: 'xl',
  // AUTO: 'auto'
});

export const themeModes = createEnum({
  DARK: 'dark'
});

/** naming convention: constant objects names are uppercased with keys camelcased */
export const THEME_DEFAULT = Object.freeze({
  mode: themeModes.DARK,
  breakpoint: breakpoints.EXTRA_SMALL
});

export const THEME_PROPTYPE = PropTypes.shape({
  mode: PropTypes.oneOf(themeModes.values).isRequired,
  breakpoint: PropTypes.oneOf(breakpoints.values).isRequired
});

export const EMPTY_STRING = '';
export const NOOP = () => {};

export default {
  EMPTY_STRING,
  NOOP,
  THEME_DEFAULT,
  THEME_PROPTYPE,
  themeModes,
  breakpoints,
};

