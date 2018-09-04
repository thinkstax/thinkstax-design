import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';
import styled from 'styled-components';
import { easing as easingEnum } from './constants';

const Container = styled.div`
  transition: ${({ duration, delay, easing }) => `opacity ${duration}ms ${easing} ${delay}ms`};
  opacity: ${({ status }) => (status === 'entered' ? 1 : 0)}
`;

export default class Fade extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleEnter(node, isAppearing) {
    /* eslint-disable */
    const { transition } = node.style;
    node.style.transition = '';
    node.style.opacity = '0';
    node.transition = transition;
    this.props.onEnter(node, isAppearing);
    /* eslint-enable */
  }

  render() {
    const { in: inProp, children, ...otherProps } = this.props; // eslint-disable-line
    const { duration } = otherProps;
    return (
      <Transition in={inProp} timeout={duration}>
        {status => (
          <Container status={status} {...otherProps} >
            {children}
          </Container>
        )}
      </Transition>
    );
  }
}


Fade.easing = easingEnum;

Fade.propTypes = {
  in: PropTypes.bool,
  duration: PropTypes.number,
  delay: PropTypes.number,
  easing: PropTypes.oneOf(Fade.easing.values),
  children: PropTypes.node.isRequired,
  onEnter: PropTypes.func
};

Fade.defaultProps = {
  in: false,
  duration: 1000,
  delay: 50,
  easing: Fade.easing.EASE_IN_OUT,
  onEnter: noop
};

function noop() {}
