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
import moment from 'moment';

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
    ...user,
    key: user.id,
    role: user?.Roles[0].name,
    birthday: user?.birthday
      ? moment(user?.birthday).format('YYYY/MM/DD')
      : '---------',
    walletAmount: user?.walletInfo?.amount,
  }));

  const columns = useMemo(() => {
    return [
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Wallet Amount',
        dataIndex: 'walletAmount',
        key: 'wallet',
        render: text => (
          <span>
            {new Intl.NumberFormat('vi-VN', {
              style: 'currency',
              currency: 'VND',
            }).format(text)}
          </span>
        ),
      },
      {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
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
        align: 'center',
        width: '100px',
        render: item => <Tag>{item}</Tag>,
      },
      {
        title: 'Status',
        dataIndex: 'isActivated',
        key: 'isActivated',
        width: '120px',
        align: 'center',
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
        width: '100px',
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
