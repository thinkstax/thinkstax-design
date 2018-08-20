import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const sideLength = 144;
const xOrigin = 6;

const Container = styled.div`
  box-sizing: border-box;
  width: ${({ scale }) => `${sideLength * scale}px`};
  height: ${({ scale }) => `${sideLength * scale}px`};
  margin: auto;
`;

const BladesContainer = styled.div`
  @keyframes spinner {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  position: relative;
  left: ${({ scale }) => `${((sideLength * scale) / 2) - (xOrigin * scale)}px`};
  div {
    position: absolute;
    animation: spinner linear 1s infinite;
    background: #006ad8;
    width: ${({ scale, blade }) => `${blade.width * scale}px`};
    height: ${({ scale, blade }) => `${blade.height * scale}px`};
    border-radius: 20%;
    transform-origin: ${({ scale }) => `${xOrigin * scale}px`} ${({ scale }) => `${(sideLength * scale) / 2}px`};
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -0.916666666666667s;
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -0.833333333333333s;
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.75s;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.666666666666667s;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.583333333333333s;
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.5s;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.416666666666667s;
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.333333333333333s;
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.25s;
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.166666666666667s;
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.083333333333333s;
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

class Spinner extends Component {
  renderBlades() {
    const blades = [];
    for (let i = 0; i < this.props.blade.count; i++) blades.push(<div key={i} />);
    return blades;
  }
  render() {
    return (
      <Container scale={this.props.scale}>
        <BladesContainer scale={this.props.scale} blade={this.props.blade}>
          {this.renderBlades()}
        </BladesContainer>
      </Container>
    );
  }
}

export default Spinner;

Spinner.propTypes = {
  blade: PropTypes.shape({
    count: PropTypes.number,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  scale: PropTypes.number
};

Spinner.defaultProps = {
  blade: {
    count: 12,
    width: 8,
    height: 32
  },
  scale: 0.25
};
