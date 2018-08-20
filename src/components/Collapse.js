/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Transition from 'react-transition-group/Transition';
import { easing as easingEnum } from './constants';

const View = styled.div`
  margin: 0;
  padding: 0;
  overflow: hidden;
  transition: ${({ duration, delay, easing }) => `height ${duration}ms ${easing} ${delay ? `${delay}ms` : ''}`};
  height: ${({ status }) => (status === 'entered' ? 'auto' : '0')}
`;

export default class Collapse extends Component {
  constructor(props) {
    super(props);
    this.handleEnter = this.handleEnter.bind(this);
    this.handleEntering = this.handleEntering.bind(this);
    this.handleEntered = this.handleEntered.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleExiting = this.handleExiting.bind(this);
    this.handleExited = this.handleExited.bind(this);
  }

  handleEnter(node, isAppearing) {
    const { transition } = node.style;
    node.style.transition = '';
    node.style.height = '0';
    node.transition = transition;
    this.props.onEnter(node, isAppearing);
  }

  handleEntering(node, isAppearing) {
    node.style.height = `${node.scrollHeight}px`;
    this.props.onEntering(node, isAppearing);
  }

  handleEntered(node, isAppearing) {
    node.style.height = `${node.scrollHeight}px`;
    this.props.onEntered(node, isAppearing);
  }

  handleExit(node) {
    const { transition } = node.style;
    node.style.transition = '';
    node.style.height = `${node.scrollHeight}px`;
    node.transition = transition;
    this.props.onExit(node);
  }

  handleExiting(node) {
    node.style.height = '0';
    this.props.onExiting(node);
  }

  handleExited(node) {
    node.style.height = '0';
    this.props.onExited(node);
  }

  render() {
    const {
      in: inProp,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      children,
      ...otherProps
    } = this.props;
    const { duration } = otherProps;
    return (
      <Transition
        in={inProp}
        timeout={duration}
        onEnter={this.handleEnter}
        onEntering={this.handleEntering}
        onEntered={this.handleEntered}
        onExit={this.handleExit}
        onExiting={this.handleExiting}
        mountOnEnter
      >
        {status => (
          <View status={status} {...otherProps}>
            {children}
          </View>
        )}
      </Transition>
    );
  }
}
Collapse.easing = easingEnum;

Collapse.propTypes = {
  duration: PropTypes.number,
  delay: PropTypes.number,
  easing: PropTypes.oneOf(Collapse.easing.values),
  in: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onEnter: PropTypes.func,
  onEntering: PropTypes.func,
  onEntered: PropTypes.func,
  onExit: PropTypes.func,
  onExiting: PropTypes.func,
  onExited: PropTypes.func
};

Collapse.defaultProps = {
  duration: 500,
  delay: 0,
  easing: Collapse.easing.EASE_IN_OUT,
  in: false,
  onEnter: noop,
  onEntering: noop,
  onEntered: noop,
  onExit: noop,
  onExiting: noop,
  onExited: noop
};

function noop() {}
