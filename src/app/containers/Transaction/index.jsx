import Table from 'app/components/Table';
import Pagination from 'app/components/Pagination';
import { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import { useTable } from './useTable';
import saga from './saga';
import { useHooks } from './hooks';
import { Typography } from 'antd';
const { Title } = Typography;

export const Transaction = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { total } = selectors;
  const tableProps = useTable();
  return (
    <div className="d-flex flex-column">
      <div>
        <Title level={2}>Transaction List</Title>
      </div>
      <Table {...tableProps}></Table>
      <Pagination total={total} pageSize={20} />
    </div>
  );
});

export default Transaction;
