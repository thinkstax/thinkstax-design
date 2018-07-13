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
  TURBO_TAX_ONLINE: 'tto'
  // QUICKBOOKS_ONLINE: 'qbo'
});

export const CHANNELS_DEFAULT = 'CALLBACK';
export const channels = createEnum({
  ANSWER_EXCHANGE: 'axc',
  [CHANNELS_DEFAULT]: 'callBack',
  PHONE: 'phone',
  SCHEDULING: 'scheduling',
  UPSELL: 'upsell'
}, CHANNELS_DEFAULT);

export const CHANNEL_PRIORITY = Object.freeze([
  channels.CALLBACK,
  channels.SCHEDULING,
  channels.PHONE
]);

export const CHANNELS_TEXT_RESOURCE_KEY = 'channels';
/** naming convention: constant objects names are uppercased with keys camelcased */
export const THEME_DEFAULT = Object.freeze({
  mode: themeModes.TURBO_TAX_ONLINE,
  breakpoint: breakpoints.EXTRA_SMALL
});

export const THEME_PROPTYPE = PropTypes.shape({
  mode: PropTypes.oneOf(themeModes.values).isRequired,
  breakpoint: PropTypes.oneOf(breakpoints.values).isRequired
});

export const textModifiers = createEnum({
  HIGHLIGHT: 'highlight'
});

export const EMPTY_STRING = '';
export const NOOP = () => {};

export default {
  EMPTY_STRING,
  NOOP,
  THEME_DEFAULT,
  THEME_PROPTYPE,
  themeModes,
  CHANNELS_DEFAULT,
  CHANNELS_TEXT_RESOURCE_KEY,
  channels,
  breakpoints,
  textModifiers
};

