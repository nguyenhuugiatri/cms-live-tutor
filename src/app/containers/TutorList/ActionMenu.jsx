import { Menu } from 'antd';
import ConfirmButton from 'app/components/ConfirmButton';

const style = { width: '100%', textAlign: 'center' };

export const ActionMenu = ({ onDeny, onAccept }) => {
  return (
    <Menu>
      <Menu.Item>
        <ConfirmButton
          title="Are you sure deny this user?"
          onConfirm={onDeny}
          text="Deny"
          style={style}
        />
      </Menu.Item>
      <Menu.Item>
        <ConfirmButton
          title="Are you sure approval this user?"
          onConfirm={onAccept}
          text="Approve"
        />
      </Menu.Item>
    </Menu>
  );
};
