import { Pagination as PaginationAntd } from 'antd';
import { memo } from 'react';
import { StyleWrapper } from './style';

export const Pagination = memo(({ current, total, ...props }) => {
  return (
    <StyleWrapper>
      <PaginationAntd
        simple
        current={+current}
        total={total || 0}
        pageSizeOptions={[]}
        {...props}
      />
    </StyleWrapper>
  );
});

export default Pagination;
