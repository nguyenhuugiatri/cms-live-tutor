/* eslint-disable react-hooks/exhaustive-deps */
import useActions from 'hooks/useActions';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import {
  selectTutorDetailData,
  selectTutorDetailStatus,
  makeLoadingAction,
} from './selectors';
import { actions } from './slice';
import { Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { getUser as getUserFromStorage } from 'utils/localStorageUtils';

const useHooks = () => {
  const [reload, setReload] = useState(false);
  const { id } = useParams();
  const user = getUserFromStorage();
  const tutorDetail = useSelector(selectTutorDetailData);
  const getTutorDetailStatus = useSelector(selectTutorDetailStatus);
  const { deny, accept } = useSelector(makeLoadingAction);
  const [form] = Form.useForm();
  const { getTutorDetail, approvalTutor } = useActions(
    {
      getTutorDetail: actions.getTutorDetail,
      approvalTutor: actions.approvalTutor,
    },
    [actions],
  );

  useEffect(() => {
    if (id) getTutorDetail(id);
  }, [id, reload]);

  const onApproval = useCallback(() => {
    if (id) approvalTutor({ id, approval: true });
    setReload(!reload);
  }, [id]);

  const onDeny = useCallback(() => {
    if (id) approvalTutor({ id, approval: false });
    setReload(!reload);
  }, [id]);

  return {
    selectors: {
      tutorDetail,
      user,
      form,
      getTutorDetailStatus,
      denyLoading: deny,
      acceptLoading: accept,
    },
    handlers: {
      onApproval,
      onDeny,
    },
  };
};

export default useHooks;
