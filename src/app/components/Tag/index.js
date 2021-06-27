import { memo } from 'react';
import { StyledTag } from './style';

export const Tag = memo(({ children, ...props }) => {
  return (
    <StyledTag color="red" {...props}>
      {children}
    </StyledTag>
  );
});

export default Tag;
