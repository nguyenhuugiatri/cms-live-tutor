import Table from 'app/components/Table';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import { memo } from 'react';
import useTable from 'hooks/useTable';
import Status from 'app/components/Status';
import { ACTION_STATUS } from 'utils/constants';
import Popconfirm from 'app/components/Popconfirm';
import { StyledStatus } from './styles';
import moment from 'moment';

export const MainTable = ({
  dataSource,
  handleDenyTutor,
  handleAcceptTutor,
}) => {
  const [form] = Form.useForm();
  const { EditableCell, data, search, onChange } = useTable({
    form,
    dataSource,
  });
  const colms = [
    { title: 'Name', dataIndex: 'id', width: '25%', ...search('id') },
    { title: 'Email', dataIndex: 'userId', width: '25%', ...search('userId') },
    { title: 'video', dataIndex: 'bio', width: '15%' },
    {
      title: 'Create At',
      dataIndex: 'createdAt',
      width: '15%',
      render: (_, record) => {
        return moment(record?.createdAt).format('DD/MM/YYYY hh:mm:ss');
      },
    },
    {
      title: 'Activated',
      dataIndex: 'isActivated',
      width: '15%',
      render: (_, record) => {
        return (
          <Status
            type={
              !!record?.isActivated
                ? ACTION_STATUS.SUCCESS
                : ACTION_STATUS.PENDING
            }
          />
        );
      },
    },
    {
      title: 'Blocked',
      width: '10%',
      dataIndex: 'isBlocked',
      render: (_, record) => {
        return (
          <StyledStatus>
            <Popconfirm
              title={`Do you want to deny this user become tutor`}
              onConfirm={() => handleDenyTutor({ ...record })}
            >
              <Button size="small" type="danger">
                Deny
              </Button>
            </Popconfirm>
            <Popconfirm
              title={`Do you want to approve this user become tutor`}
              onConfirm={() => handleAcceptTutor({ ...record })}
            >
              <Button size="small" type="primary">
                Accept
              </Button>
            </Popconfirm>
          </StyledStatus>
        );
      },
    },
    {
      title: 'Action',
      render: (_, record) => (
        <Button size="small" type="primary">
          View Detail
        </Button>
      ),
    },
  ];
  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        dataSource={data}
        columns={colms}
        size="small"
        pagination={{ pageSize: 11, position: ['topRight'] }}
        bordered
        onChange={onChange}
      />
    </Form>
  );
};
export default memo(MainTable);
