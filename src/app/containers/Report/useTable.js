import { useSelector } from 'react-redux';
import { makeLoading, makeReportList } from './selector';
import get from 'lodash/fp/get';
import useActions from 'hooks/useActions';
import { actions } from './slice';
import { useEffect } from 'react';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
export const useTable = () => {
  const reportList = useSelector(makeReportList);
  const loading = useSelector(makeLoading);
  const location = useLocation();
  const { getReport } = useActions({ getReport: actions.getReport }, [actions]);

  useEffect(() => {
    const { page, perPage } = qs.parse(location.search);
    getReport({ page, perPage });
  }, [getReport, location.search]);

  const dataSource = reportList.map(report => ({
    reporter: get('userInfo.name', report),
    tutorName: get('tutorInfo.name', report),
    content: get('content', report),
    createdAt: moment(get('createdAt', report)).format('YYYY/MM/DD hh:mm:ss'),
  }));

  const columns = [
    {
      title: 'Reporter',
      key: 'reporter',
      dataIndex: 'reporter',
      width: '15%',
    },
    {
      title: 'Tutor',
      key: 'tutor',
      dataIndex: 'tutorName',
      width: '15%',
    },
    {
      title: `Report's content`,
      key: 'content',
      dataIndex: 'content',
    },
    {
      title: 'Time',
      key: 'time',
      dataIndex: 'createdAt',
      width: '15%',
    },
  ];
  return {
    columns,
    loading,
    dataSource,
  };
};
