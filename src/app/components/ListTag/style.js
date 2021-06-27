import styled from 'styled-components';

export const StyleTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  & > * {
    margin: 5px;
    font-size: 13px;
    text-transform: capitalize;
  }
`;
