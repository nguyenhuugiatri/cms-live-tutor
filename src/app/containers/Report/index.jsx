import Table from 'app/components/Table';
import { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import { useTable } from './useTable';
import saga from './saga';
import { useHooks } from './hooks';
import { Typography } from 'antd';
import Pagination from 'app/components/Pagination';
const { Title } = Typography;
export const Report = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { total } = selectors;
  const tableProps = useTable();
  return (
    <div className="d-flex flex-column">
      <div className="d-flex">
        <Title level={2}>Report list</Title>
      </div>

      <Table {...tableProps}></Table>
      <Pagination total={total} pageSize={20} />
    </div>
  );
});

export default Report;
