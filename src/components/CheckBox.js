import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { create as createEnum } from '../../utils/enum';

let defaultId = 1;
const COLOR_PRIMARY = '#06b6c9';
const HiddenCheckBox = styled.input.attrs({
  type: 'checkbox'
})`
  display: none;
`;
const Label = styled.label`
  position: relative;
  display: inline-block;
  margin: 0;
  padding: 0;
  height: ${getCheckBoxSideLength};
`;
const FakeCheckBox = styled.span`
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  color: #6B6C72;
  box-shadow: inset 0px 0px 0px 3px white;
  border: 1px solid lightgrey;
  height: ${getCheckBoxSideLength};
  width: ${getCheckBoxSideLength};
  background-color: ${({ checked }) => (checked ? COLOR_PRIMARY : '#eeeeee')};
  border-radius: 2px;
  transition: all 150ms;
  &:hover {
    border: 1px solid ${COLOR_PRIMARY};
    outline: 0;
  }
  &:focus, &:active {
    outline: 0;
    border: 2px solid ${COLOR_PRIMARY};
  }
  ${HiddenCheckBox}:checked + & {
    background-color: ${COLOR_PRIMARY};
    border: 1px solid ${COLOR_PRIMARY};

    :after {
      content: '';
      left: ${getCheckmarkLeftPosition};
      top: ${getCheckmarkTopPosition};
      width: ${getCheckmarkWidth};
      height: ${getCheckmarkHeight};
      border: solid white;
      position: absolute;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
  }
`;

const Title = styled.span`
  display: inline-block;
  margin: 0 0 0 8px;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  line-height: 1;
  position: relative;
  vertical-align: middle;
  height: ${getCheckBoxSideLength};
  top: ${getTitleTopPosition};
  color: #6B6C72;
  font-size: ${getFontSize}
`;
export default class CheckBox extends Component {
  constructor(props) {
    super(props);
    const { checked } = props;
    this.state = { checked };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  getSize() {
    const {
      small, medium, large, size
    } = this.props;
    if (small) return CheckBox.sizes.SMALL;
    if (medium) return CheckBox.sizes.MEDIUM;
    if (large) return CheckBox.sizes.LARGE;

    return size;
  }
  toggle() {
    const checked = !this.state.checked;
    this.setState({ checked });
    return checked;
  }
  handleChange(ev) {
    const {
      onChange,
      onValueChange
    } = this.props;
    const checked = this.toggle();
    onChange(ev, checked);
    onValueChange(checked);
  }
  render() {
    const {
      id = `cb_${defaultId++}`,
      title,
      checked,
      onChange,
      onValueChange,
      size,
      ...otherProps
    } = this.props;
    return (
      <Label htmlFor={id}>
        <HiddenCheckBox
          id={id}
          onChange={this.handleChange}
          checked={this.state.checked}
          value={this.state.checked}
          {...otherProps}
        />
        <FakeCheckBox size={this.getSize()} />
        {title ? <Title size={this.getSize()}>{title}</Title> : null}
      </Label>
    );
  }
}

const DEFAULT_SIZE = 'MEDIUM';
CheckBox.sizes = createEnum({
  SMALL: 'sm',
  [DEFAULT_SIZE]: 'md',
  LARGE: 'lg'
}, DEFAULT_SIZE);

CheckBox.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  size: PropTypes.oneOf(CheckBox.sizes.values),
  checked: PropTypes.bool,
  small: PropTypes.bool,
  medium: PropTypes.bool,
  large: PropTypes.bool,
  onChange: PropTypes.func,
  onValueChange: PropTypes.func
};

CheckBox.defaultProps = {
  id: null,
  title: null,
  size: CheckBox.sizes.DEFAULT,
  small: false,
  medium: false,
  large: false,
  checked: false,
  onChange: () => {},
  onValueChange: () => {}
};

function getFontSize({ size }) {
  const fontSizes = {
    [CheckBox.sizes.SMALL]: '14px',
    [CheckBox.sizes.MEDIUM]: '18px',
    [CheckBox.sizes.LARGE]: '22px'
  };

  return fontSizes[size] || fontSizes[CheckBox.sizes.DEFAULT];
}
function getTitleTopPosition({ size }) {
  const topPostions = {
    [CheckBox.sizes.SMALL]: '-0.12em',
    [CheckBox.sizes.MEDIUM]: '-0.18em',
    [CheckBox.sizes.LARGE]: '-0.24em'
  };

  return topPostions[size] || topPostions[CheckBox.sizes.DEFAULT];
}

function getCheckmarkHeight({ size }) {
  const heights = {
    [CheckBox.sizes.SMALL]: '6px',
    [CheckBox.sizes.MEDIUM]: '8px',
    [CheckBox.sizes.LARGE]: '12px'
  };

  return heights[size] || heights[CheckBox.sizes.DEFAULT];
}
function getCheckmarkWidth({ size }) {
  const widths = {
    [CheckBox.sizes.SMALL]: '3px',
    [CheckBox.sizes.MEDIUM]: '4px',
    [CheckBox.sizes.LARGE]: '6px'
  };

  return widths[size] || widths[CheckBox.sizes.DEFAULT];
}
function getCheckmarkLeftPosition({ size }) {
  const widths = {
    [CheckBox.sizes.SMALL]: '8px',
    [CheckBox.sizes.MEDIUM]: '9px',
    [CheckBox.sizes.LARGE]: '10px'
  };

  return widths[size] || widths[CheckBox.sizes.DEFAULT];
}
function getCheckmarkTopPosition({ size }) {
  const widths = {
    [CheckBox.sizes.SMALL]: '5px',
    [CheckBox.sizes.MEDIUM]: '6px',
    [CheckBox.sizes.LARGE]: '4px'
  };

  return widths[size] || widths[CheckBox.sizes.DEFAULT];
}
function getCheckBoxSideLength({ size }) {
  const sideLengths = {
    [CheckBox.sizes.SMALL]: '20px',
    [CheckBox.sizes.MEDIUM]: '24px',
    [CheckBox.sizes.LARGE]: '28px'
  };

  return sideLengths[size] || sideLengths[CheckBox.sizes.DEFAULT];
}
