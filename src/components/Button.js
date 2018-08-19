
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from 'styled-theming';
import { THEME_DEFAULT, THEME_PROPTYPE, themeModes } from '../constants';
import { create as createEnum } from '../utils/enum';

const { DARK } = themeModes;
const backgroundColor = theme.variants('mode', 'type', {
  default: { [DARK]: '#d4d7dc' },
  primary: { [DARK]: ({ inverted }) => (inverted ? '#ffffff' : '#06b6c9') },
  link: { [DARK]: 'transparent' }
});
const backgroundColorHover = theme.variants('mode', 'type', {
  default: { [DARK]: '#babec5' },
  primary: { [DARK]: ({ inverted }) => (inverted ? 'rgba(6, 182, 201, 0.1)' : '#05a4b5') },
  link: { [DARK]: 'none' }
});
const color = theme.variants('mode', 'type', {
  default: { [DARK]: '#6b6c72' },
  primary: { [DARK]: ({ inverted }) => (inverted ? '#06b6c9' : '#ffffff') },
  link: { [DARK]: '#05a4b5' }
});

const textDecoration = theme.variants('mode', 'type', {
  default: { [DARK]: 'none' },
  primary: { [DARK]: 'none' },
  link: { [DARK]: 'underline' }
});

const border = theme.variants('mode', 'type', {
  default: { [DARK]: '1px solid #ccc' },
  primary: { [DARK]: '1px solid #06b6c9' },
  link: { [DARK]: 'none' }
});

const StyledButton = styled.button`
  background-color: ${backgroundColor};
  border-radius: 4px;
  padding: ${getPadding};
  font-size: ${getFontSize};
  border: ${border};
  cursor: pointer;
  color: ${color};
  width: fit-content;
  &:disabled {
    background-color: #337ab7 !important;
    opacity: .65;
    cursor: not-allowed;
  }
  &:hover {
    background: ${backgroundColorHover};
    text-decoration: ${textDecoration};
  }
  &:focus {
    outline: none;
  }
`;


export default class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  getSize() {
    const {
      small, medium, large, size
    } = this.props;
    if (small) return Button.sizes.SMALL;
    if (medium) return Button.sizes.MEDIUM;
    if (large) return Button.sizes.LARGE;

    return size;
  }
  handleClick(ev) {
    const {
      onPress = () => {},
      disabled
    } = this.props;

    if (disabled) {
      ev.preventDefault();
      ev.stopImmediatePropagation();
      return false;
    }
    return onPress(ev);
  }
  render() {
    const {
      title,
      type,
      link,
      primary,
      size,
      ...otherProps
    } = this.props;

    const getType = () => {
      if (link) return Button.types.LINK;
      if (primary) return Button.types.PRIMARY;
      return type;
    };

    return (
      <StyledButton
        type={getType()}
        size={this.getSize()}
        onClick={this.handleClick}
        {...otherProps}
      >
        {title}
      </StyledButton>
    );
  }
}

Button.types = createEnum({
  DEFAULT: 'default',
  PRIMARY: 'primary',
  LINK: 'link'
});

const DEFAULT_SIZE = 'MEDIUM';
Button.sizes = createEnum({
  SMALL: 'sm',
  [DEFAULT_SIZE]: 'md',
  LARGE: 'lg'
}, DEFAULT_SIZE);

Button.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string,
  type: PropTypes.oneOf(Button.types.values),
  size: PropTypes.oneOf(Button.sizes.values),
  link: PropTypes.bool,
  primary: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  disabled: PropTypes.bool,
  inverted: PropTypes.bool,
  theme: THEME_PROPTYPE
  // ghost: PropTypes.bool
};

Button.defaultProps = {
  onPress: () => {},
  title: 'Button',
  type: Button.types.DEFAULT,
  size: Button.sizes.DEFAULT,
  small: false,
  medium: false,
  large: false,
  link: false,
  primary: false,
  disabled: false,
  inverted: false,
  theme: THEME_DEFAULT
  // ghost: false
};

function getFontSize({ size }) {
  const fontSizes = {
    [Button.sizes.SMALL]: '14px',
    [Button.sizes.MEDIUM]: '18px',
    [Button.sizes.LARGE]: '22px'
  };

  return fontSizes[size] || fontSizes[Button.sizes.DEFAULT];
}
function getPadding({
  size, link, type, primary
}) {
  if ((link || type === Button.types.LINK) && !primary) return '0';
  const padding = {
    [Button.sizes.SMALL]: '10px 20px',
    [Button.sizes.MEDIUM]: '14px 20px',
    [Button.sizes.LARGE]: '18px 20px'
  };

  return padding[size] || padding[Button.sizes.DEFAULT];
}
