import { Pagination as PaginationAntd } from 'antd';
import { memo } from 'react';
import { usePagination } from './hooks';
import { StyleWrapper } from './style';

export const Pagination = memo(({ current, total, ...props }) => {
  const paginationProps = usePagination({ total });
  return (
    <StyleWrapper>
      <PaginationAntd
        simple
        current={+current}
        total={total || 0}
        pageSizeOptions={[]}
        {...paginationProps}
        {...props}
      />
    </StyleWrapper>
  );
});

export default Pagination;
