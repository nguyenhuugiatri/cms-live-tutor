import Table from 'app/components/Table';
import { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import { useTable } from './useTable';
import saga from './saga';
import { FlexColumn } from 'app/components/FlexColumn';
import { Typography } from 'antd';
import { useHooks } from './hooks';
import Pagination from 'app/components/Pagination';
const { Title } = Typography;

export const TutorList = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors } = useHooks();
  const { total } = selectors;
  const propsTable = useTable();
  return (
    <FlexColumn>
      <div>
        <Title level={2}>Tutor List</Title>
      </div>
      <Table {...propsTable} />
      <Pagination total={total} />
    </FlexColumn>
  );
});

export default TutorList;
