import useActions from 'hooks/useActions';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { makeTransactionList } from './selectors';
import { actions } from './slice';

export const useTable = () => {
  const transactionList = useSelector(makeTransactionList);
  const { getTransactionList } = useActions(
    { getTransactionList: actions.getTransactionList },
    [actions],
  );

  useEffect(() => {
    getTransactionList();
  }, []);

  const dataSource = transactionList.map(tran => ({
    price: tran.price,
    status: tran.status,
    tutorName: tran?.scheduleDetailInfo?.schedule?.Info?.tutorInfo?.name,
    type: tran.type,
    bookingUser: tran?.bookingInfo?.userInfo?.name,
  }));

  const columns = useMemo(() => {
    return [
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
      },
      {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: 'Status',
        dataIndex: 'price',
        key: 'price',
      },
    ];
  }, []);
  return {
    dataSource,
    columns,
  };
};
