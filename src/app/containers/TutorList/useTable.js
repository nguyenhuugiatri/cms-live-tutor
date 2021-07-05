import ListTag from 'app/components/ListTag';
import useActions from 'hooks/useActions';
import Tag from 'app/components/Tag';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { makeListTutor, makeLoading } from './selector';
import { actions } from './slice';
import { StyledFlexLayout } from './styles';
import { useHistory, useLocation } from 'react-router-dom';
import qs from 'query-string';
import Button from 'app/components/Button';
import Dropdown from 'app/components/Dropdown';
import { ActionMenu } from './ActionMenu';

export const useTable = () => {
  const [requestRender, setRequest] = useState(false);
  const history = useHistory();
  const listTutor = useSelector(makeListTutor);
  const loading = useSelector(makeLoading);
  const location = useLocation();
  const { getList, approvalTutor } = useActions(
    { getList: actions.getList, approvalTutor: actions.approvalTutor },
    [actions],
  );

  const dataSource = useMemo(() => {
    return listTutor.map(tutor => ({
      key: tutor?.id,
      ...tutor,
    }));
  }, [listTutor]);

  const showInfoTutor = useCallback(
    tutor => {
      history.push(`/tutors/${tutor.userId}`);
    },
    [history],
  );

  const onDeny = useCallback(
    ({ userId }) => {
      approvalTutor({ id: userId, approval: false });
      setRequest(!requestRender);
    },
    [approvalTutor, requestRender],
  );
  const onAccept = useCallback(
    ({ userId }) => {
      approvalTutor({ id: userId, approval: true });
      setRequest(!requestRender);
    },
    [approvalTutor, requestRender],
  );

  useEffect(() => {
    const { page, perPage } = qs.parse(location.search);
    getList({ page, perPage });
  }, [getList, location.search, requestRender]);

  const columns = useMemo(() => {
    return [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        // width: '100px',
      },
      {
        title: 'Bio',
        dataIndex: 'bio',
        key: 'bio',
        // width: '15%',
      },
      {
        title: 'Education',
        dataIndex: 'education',
        key: 'education',
        // width: '15%',
      },
      {
        title: 'Interests',
        dataIndex: 'interests',
        key: 'interests',
        // width: '20%',
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        // width: '100px',
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
        title: 'Target Student',
        dataIndex: 'targetStudent',
        key: 'targetStudent',
        align: 'center',
        render: text => {
          return (
            <div className="d-flex justify-content-center">
              <ListTag tags={text.split(' ')} />
            </div>
          );
        },
      },
      {
        title: 'Status',
        dataIndex: 'isActivated',
        key: 'isActivated',
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
        align: 'center',
        render: (_, record) => {
          return (
            <StyledFlexLayout>
              {record?.isActivated ? (
                <Button
                  onClick={() => {
                    showInfoTutor(record);
                  }}
                  style={{ marginRight: '5px' }}
                  type="primary"
                >
                  View Detail
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      showInfoTutor(record);
                    }}
                    style={{ marginRight: '5px' }}
                    type="primary"
                  >
                    View Detail
                  </Button>
                  <Dropdown
                    overlay={ActionMenu({
                      onDeny: () => onDeny(record),
                      onAccept: () => onAccept(record),
                    })}
                    placement="bottomRight"
                    trigger={['click']}
                  >
                    <Button className="ml-2">More</Button>
                  </Dropdown>
                </>
              )}
            </StyledFlexLayout>
          );
        },
      },
    ];
  }, [onAccept, onDeny, showInfoTutor]);

  return {
    dataSource,
    columns,
    loading,
    size: 'small',
    tableLayout: 'fixed',
    bordered: true,
  };
};
