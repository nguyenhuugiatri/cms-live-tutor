import { Layout } from 'antd';
import styled from 'styled-components';
import { COLOR } from '../../../../styles/colorPalette';
export const StyledLayout = styled(Layout)`
  width: 100%;
  height: 100vh;
`;
export const StyledHeader = styled(Layout.Header)`
  background-color: ${COLOR.SEMANTIC.GREY[2]};
  color: ${COLOR.SEMANTIC.BLACK[0]};
  display: flex;
  justify-content: space-between;
`;
