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
  const dataTable = waitingList.map(row => {
    const { User, ...info } = row;
    const tutor = {
      ...User,
      ...info,
    };
    return tutor;
  });
  const { handleDenyTutor, handleAcceptTutor, showInfoTutor } = handles;
  return (
    <StyledLayout>
      <Title level={4}>List of User</Title>
      <Table
        dataSource={dataTable}
        handleDenyTutor={handleDenyTutor}
        handleAcceptTutor={handleAcceptTutor}
        showInfoTutor={showInfoTutor}
      />
    </StyledLayout>
  );
};
export default memo(ApprovalTutorList);
