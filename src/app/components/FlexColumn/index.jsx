import { memo } from 'react';
import { StyledLayout } from './style';

export const FlexColumn = memo(({ children }) => {
  return <StyledLayout>{children}</StyledLayout>;
});
