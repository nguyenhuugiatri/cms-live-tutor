import ListTag from 'app/components/ListTag';
import useActions from 'hooks/useActions';
import Tag from 'app/components/Tag';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { makeListTutor, makeLoading } from './selector';
import { actions } from './slice';
import { StyledFlexLayout } from './styles';
import { useLocation } from 'react-router-dom';
import qs from 'query-string';
import Button from 'app/components/Button';
import { actions as popupActions } from 'app/containers/Popup/slice';
import { POPUP_TYPE } from '../Popup/constants';

export const useTable = () => {
  const listTutor = useSelector(makeListTutor);
  const loading = useSelector(makeLoading);
  const location = useLocation();
  const { getList } = useActions({ getList: actions.getList }, [actions]);

  useEffect(() => {
    const { page, perPage } = qs.parse(location.search);
    getList({ page, perPage });
  }, [location.search]);

  const dataSource = useMemo(() => {
    return listTutor.map(tutor => ({
      key: tutor?.id,
      ...tutor,
    }));
  }, [listTutor]);
  const { openPopup } = useActions({ openPopup: popupActions.openPopup }, [
    popupActions,
  ]);

  const showInfoTutor = useCallback(
    tutor => {
      openPopup({
        key: 'showInfoTutor',
        type: POPUP_TYPE.INFO_TUTOR,
        tutor,
      });
    },
    [openPopup],
  );

  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '100px',
      },
      {
        title: 'Bio',
        dataIndex: 'bio',
        key: 'bio',
        width: '15%',
      },
      {
        title: 'Education',
        dataIndex: 'education',
        key: 'education',
      },
      {
        title: 'Interests',
        dataIndex: 'interests',
        key: 'interests',
      },
      {
        title: 'Target Student',
        dataIndex: 'targetStudent',
        key: 'targetStudent',
        width: '250px',
        render: text => {
          return <ListTag tags={text.split(' ')} />;
        },
      },
      {
        title: 'Status',
        dataIndex: 'isActivated',
        key: 'isActivated',
        width: '100px',
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
        width: '10%',
        render: (_, record) => {
          return (
            <StyledFlexLayout>
              <Button
                onClick={() => {
                  showInfoTutor(record);
                }}
              >
                View Detail
              </Button>
            </StyledFlexLayout>
          );
        },
      },
    ];
  }, []);
  return {
    dataSource,
    columns,
    loading,
  };
};
