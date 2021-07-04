/* eslint-disable react-hooks/exhaustive-deps */
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { selectTutorDetailData, selectTutorDetailStatus } from './selectors';
import { actions } from './slice';
import { Form } from 'antd';
import { useEffect } from 'react';
import { ACTION_STATUS } from 'utils/constants';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

const useHooks = () => {
  const { id } = useParams();
  const user = getUserFromStorage();
  const tutorDetail = useSelector(selectTutorDetailData);
  const getTutorDetailStatus = useSelector(selectTutorDetailStatus);
  const [form] = Form.useForm();
  const { getTutorDetail } = useActions(
    {
      getTutorDetail: actions.getTutorDetail,
    },
    [actions],
  );

  useEffect(() => {
    if (id) getTutorDetail(id);
  }, [id]);

  return {
    selectors: {
      tutorDetail,
      user,
      form,
      getTutorDetailStatus,
    },
    handlers: {},
  };
};

export default useHooks;
