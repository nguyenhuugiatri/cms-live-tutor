import styled from 'styled-components';

export const StyledLayout = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  overflow-y: scroll;
  flex-direction: column;
`;

export const StyledStatus = styled.div`
  display: flex;
  > button {
    margin-right: 5px;
  }
`;
