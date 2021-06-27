import Button from 'app/components/Button';
import Tag from 'app/components/Tag';
import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import { makeUserList, makeLoading, makeTotal } from './selectors';
import { actions } from './slice';
import { StyledFlexLayout } from './styles';
import Popconfirm from 'app/components/Popconfirm';
import { useHooks } from './hooks';

export const useTable = () => {
  const userList = useSelector(makeUserList);
  const loading = useSelector(makeLoading);
  const location = useLocation();
  const total = useSelector(makeTotal);
  const { getListUser, manageActivated } = useActions(
    {
      getListUser: actions.getListUser,
      manageActivated: actions.manageActivated,
    },
    [actions],
  );

  useEffect(() => {
    const { page, perPage } = qs.parse(location.search);
    getListUser({ page, perPage });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, manageActivated]);

  const dataSource = userList.map(user => ({
    key: user.id,
    role: user?.Roles[0].name,
    ...user,
  }));

  const columns = useMemo(() => {
    return [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '15%',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '15%',
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
        width: '15%',
      },
      {
        title: 'Birthday',
        dataIndex: 'birthday',
        key: 'birthday',
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '100px',
        render: item => <Tag>{item}</Tag>,
      },
      {
        title: 'Status',
        dataIndex: 'isActivated',
        key: 'isActivated',
        width: '120px',
        render: item => {
          let color = item === true ? '#87d068' : '#f50';
          return (
            <Tag color={color}>{item === true ? 'Activated' : 'Blocked'}</Tag>
          );
        },
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <StyledFlexLayout>
            {record.isActivated ? (
              <Popconfirm
                title="Are you sure to block this user?"
                onConfirm={() => manageActivated(record)}
                okText="Sure"
                cancelText="No"
              >
                <Button size="small">Block</Button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="Did you sure to activate this user?"
                onConfirm={() => manageActivated(record)}
                okText="Sure"
                cancelText="No"
              >
                <Button size="small" type="primary">
                  Active
                </Button>
              </Popconfirm>
            )}
          </StyledFlexLayout>
        ),
      },
    ];
  }, [manageActivated]);
  return {
    dataSource,
    columns,
    size: 'small',
    loading,
    total,
  };
};
