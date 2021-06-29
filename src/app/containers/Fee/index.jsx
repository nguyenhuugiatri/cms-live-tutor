import Table from 'app/components/Table';
import { memo } from 'react';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';
import { sliceKey, reducer } from './slice';
import { useTable } from './useTable';
import saga from './saga';
import { Typography } from 'antd';
import Form from 'antd/lib/form/Form';
const { Title } = Typography;

export const Fee = memo(() => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { table, form } = useTable();
  return (
    <div className="d-flex flex-column">
      <div>
        <Title level={2}>Fee List</Title>
      </div>
      <Form form={form} component={false}>
        <Table {...table}></Table>
      </Form>
    </div>
  );
});

export default Fee;
