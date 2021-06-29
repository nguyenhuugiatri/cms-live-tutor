import { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import saga from './saga';
import { useTable } from './useTable';
import Table from 'app/components/Table';
import { Typography } from 'antd';
import { FlexColumn } from 'app/components/FlexColumn';
import { Pagination } from 'app/components/Pagination';
import { useHooks } from './hooks';

const { Title } = Typography;

export const UserList = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { total } = selectors;
  const tableProps = useTable();

  return (
    <FlexColumn>
      <div>
        <Title level={2}>User list</Title>
      </div>
      <Table {...tableProps}></Table>
      <Pagination total={total} />
    </FlexColumn>
  );
});

export default UserList;
