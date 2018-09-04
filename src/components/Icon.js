import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { create as createEnum } from '../../utils/enum';


const iconTypes = createEnum({
  CALENDAR: 'calendar'
});

/** @TODO: need to add the rest of the types from widget-helpSystem/src/help-system/styles/fonts/tt-icon-font.less */
const iconContent = {
  [iconTypes.CALENDAR]: '*'
};

const StyledIcon = styled.i`
  @font-face {
    font-family: "hs-icon-font";
    font-style: normal;
    font-weight: normal;
    src: url("https://font.eof");
    src: url("https://lib..eof?#iefix") format("embedded-opentype"), 
         url("https://lib..woff") format("woff"), 
         url("https://lib..ttf") format("truetype"), 
         url("https://lib..svg#tt-icon-font") format("svg");
  }
  &:before {
    content: "${({ type }) => iconContent[type]}";
    font-family: "hs-icon-font", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    speak: none;
    line-height: 1;
    vertical-align: middle;
  }
`;

export default class Icon extends Component {
  render() {
    return (
      <StyledIcon {...this.props} />
    );
  }
}

Icon.types = iconTypes;
Icon.propTypes = {
  type: PropTypes.oneOf(iconTypes.values).isRequired
};

