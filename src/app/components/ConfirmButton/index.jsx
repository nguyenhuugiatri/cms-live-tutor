import { Popconfirm } from 'antd';
import { memo } from 'react';
import Button from '../Button';

export const ConfirmButton = memo(
  ({ title, onConfirm, onCancel, text, ...rest }) => {
    return (
      <Popconfirm
        title={title}
        onConfirm={onConfirm}
        onCancel={onCancel}
        okText="Yes"
        cancelText="No"
      >
        <Button {...rest}>{text}</Button>
      </Popconfirm>
    );
  },
);

export default ConfirmButton;
