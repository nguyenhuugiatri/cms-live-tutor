import styled from 'styled-components';
import { Button } from 'antd';
import { COLOR } from '../../../../styles/colorPalette';
const primaryStyle = {
  'background-color': COLOR.PRIMARY[0],
  color: COLOR.SEMANTIC.GREY[2],
  border: `1.5px solid ${COLOR.PRIMARY[0]}`,
};
const accentStyle = {
  'background-color': COLOR.ACCENT[0],
  color: COLOR.SEMANTIC.GREY[2],
  border: `1.5px solid ${COLOR.ACCENT[0]}`,
};
const defaultStyle = {
  'background-color': COLOR.SEMANTIC.GREY[2],
  color: COLOR.ACCENT[0],
  border: `1.5px solid ${COLOR.ACCENT[0]}`,
  primary: {
    'background-color': COLOR.SEMANTIC.GREY[2],
    color: COLOR.PRIMARY[0],
    border: `1.5px solid ${COLOR.PRIMARY[0]}`,
  },
};
const configButton = ({ disable, size, type }) => {
  let config = { 'border-radius': '6px' };
  if (!disable) {
    switch (type) {
      case 'primary':
        return {
          ...primaryStyle,
          ...config,
        };
      case 'accent':
        return {
          ...accentStyle,
          ...config,
        };
      default:
        return {
          ...defaultStyle,
          ...config,
        };
    }
  }
  return config;
};
const configHover = ({ disable, type }) => {
  if (!disable) {
    switch (type) {
      case 'primary':
        return {
          ...defaultStyle.primary,
        };
      case 'accent':
        return {
          ...defaultStyle,
        };
      default:
        return {
          ...accentStyle,
        };
    }
  }
};
const configActive = ({ type }) => {
  switch (type) {
    case 'primary':
      return {
        ...defaultStyle.primary,
      };
    case 'accent':
      return {
        ...defaultStyle,
      };
    default:
      return {
        ...accentStyle,
      };
  }
};
export const StyledButton = styled(Button)`
  ${props => configButton(props)}
  padding:10px 20px;
  margin: 0px 15px;
  line-height: 1;
  &:hover {
    ${props => configHover(props)}
  }
  &:focus {
    ${props => configActive(props)}
  }
  height: 100%;
`;
