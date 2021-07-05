import Tag from 'app/components/Tag';
import useActions from 'hooks/useActions';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeTransactionList } from './selectors';
import { actions } from './slice';
import qs from 'query-string';
import { useLocation } from 'react-router-dom';
import TypeTag from './TypeTag';
export const useTable = () => {
  const transactionList = useSelector(makeTransactionList);
  const location = useLocation();
  const { getTransactionList } = useActions(
    { getTransactionList: actions.getTransactionList },
    [actions],
  );

  useEffect(() => {
    const { page, perPage } = qs.parse(location.search);

    getTransactionList({ page, perPage });
  }, [getTransactionList, location.search]);

  const dataSource = transactionList.map(tran => ({
    key: tran.key,
    price: tran.price,
    status: tran.status,
    tutorName:
      tran?.bookingInfo?.scheduleDetailInfo?.scheduleInfo?.tutorInfo?.name,
    type: tran.type,
    bookingUser: tran?.bookingInfo?.userInfo?.name,
  }));

  const columns = [
    {
      title: 'Booking User',
      dataIndex: 'bookingUser',
      key: 'bookingUser',
    },
    {
      title: 'Tutor Name',
      dataIndex: 'tutorName',
      key: 'tutorName',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      render: item => <TypeTag text={item} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: item =>
        item === 'success' ? (
          <Tag color="green">Success</Tag>
        ) : (
          <Tag>{item}</Tag>
        ),
    },
    {
      title: 'Price (VND)',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      render: text => (
        <span>
          {new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
          }).format(text)}
        </span>
      ),
    },
  ];
  return {
    dataSource,
    columns,
  };
};
