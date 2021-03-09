import { memo } from 'react';
import Table from './Table';
import saga from './saga';
import { useInjectSaga, useInjectReducer } from 'utils/reduxInjectors';
import { sliceKey, reducer } from './slice';
import useHooks from './hooks';
import Title from 'app/components/Title';
import { StyledLayout } from './styles';

export const ApprovalTutorList = () => {
  useInjectSaga({ key: sliceKey, saga });
  useInjectReducer({ key: sliceKey, reducer });
  const { selectors, handles } = useHooks();
  const { waitingList } = selectors;
  const { handleDenyTutor, handleAcceptTutor } = handles;
  return (
    <StyledLayout>
      <Title level={4}>List of User</Title>
      <Table
        dataSource={waitingList}
        handleDenyTutor={handleDenyTutor}
        handleAcceptTutor={handleAcceptTutor}
      />
    </StyledLayout>
  );
};
export default memo(ApprovalTutorList);
