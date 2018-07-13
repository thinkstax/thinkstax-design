
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { create as createEnum } from '../../utils/enum';

const DEFAULT_SHAPE = 'SQUARE';
const shapes = createEnum({
  CIRCLE: 'circle',
  [DEFAULT_SHAPE]: 'square'
}, DEFAULT_SHAPE);

const Image = styled.div`
  border-radius: ${props => (props.shape === shapes.CIRCLE ? '50%' : '0')};
  overflow: hidden;
  display: inline-block;
  background-image: url(${props => props.src});
  height: ${(props) => {
    switch (typeof props.height) {
      case 'string':
        return props.height;
      case 'number':
        return `${props.height}px`;
      default:
        return '80px';
    }
  }};
  width: ${(props) => {
    switch (typeof props.width) {
      case 'string':
        return props.width;
      case 'number':
        return `${props.width}px`;
      default:
        return '80px';
    }
  }};
  background-size: ${(props) => {
    switch (typeof props.size) {
      case 'string':
        return props.size;
      default:
        return '';
    }
  }};
`;

export default class Avatar extends Component {
  render() {
    return (
      <Image {...this.props} />
    );
  }
}

Avatar.shapes = shapes;

Avatar.propTypes = {
  src: PropTypes.string.isRequired,
  shape: PropTypes.oneOf(Avatar.shapes.values)
};

Avatar.defaultProps = {
  shape: Avatar.shapes.DEFAULT
};
