import Layout from '../../components/Layout';
import Menu from 'app/components/Menu';
import Space from 'app/components/Space';
import Button from 'app/components/Button';
const NormalLayout = ({ children }) => {
  return (
    <Layout>
      <Layout.StyledHeader>
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">For organizations</Menu.Item>
          <Menu.Item key="2">For kids</Menu.Item>
          <Menu.Item key="3">Our courses</Menu.Item>
        </Menu>
        <Space>
          <Button size="medium">LOG IN</Button>
          <Button size="medium" type="accent">
            SIGN UP
          </Button>
        </Space>
      </Layout.StyledHeader>
    </Layout>
  );
};
export default NormalLayout;
