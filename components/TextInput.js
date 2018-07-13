import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const style = css`
    font: inherit;
    background-color: #fff;
    box-shadow: unset;
    box-sizing: border-box;
    border: 1px solid #CCC;
    border-radius: 3.5px;
    color: #393A3D;
    cursor: text;
    font-size: 14px;
    margin-bottom: 5px;
    padding: 12px;
    resize: none;
    white-space: pre-wrap;
    width: 100%;
    word-wrap: break-word;
    &:focus {
    outline: 0;
    border: 1px solid #06b6c9;
    box-shadow: 0 0 4px 0 rgba(6, 182, 201, 0.5);
  }
`;

const TextArea = styled.textarea`
  ${style}
`;

const Input = styled.input.attrs({
  type: 'text'
})`
  ${style}
`;

export default class TextInput extends Component {
  render() {
    const {
      onChangeText,
      multiline,
      numberOfLines,
      ...otherProps
    } = this.props;
    const StyledTextInput = (multiline) ? TextArea : Input;

    return (
      <StyledTextInput
        rows={numberOfLines}
        onChange={e => onChangeText(e && e.target && e.target.value)}
        {...otherProps}
      />
    );
  }
}

TextInput.propTypes = {
  onChangeText: PropTypes.func,
  multiline: PropTypes.bool,
  numberOfLines: PropTypes.number
};

TextInput.defaultProps = {
  onChangeText: () => {},
  multiline: false,
  numberOfLines: 5
};
