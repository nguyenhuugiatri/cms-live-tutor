import React from 'react';
import CommonLayout from 'app/containers/AppLayout/CommonLayout';
import { StyledDashboard } from './styles';

const Dashboard = props => {
  return (
    <CommonLayout>
      <StyledDashboard></StyledDashboard>
    </CommonLayout>
  );
};

export default Dashboard;
