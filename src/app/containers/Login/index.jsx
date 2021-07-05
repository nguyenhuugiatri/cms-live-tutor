import { LockOutlined, MailOutlined } from '@ant-design/icons';
import Button from 'app/components/Button';
import Form from 'app/components/Form';
import Input from 'app/components/Input';
import Title from 'app/components/Title';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ACTION_STATUS } from 'utils/constants';
import useHooks from './hooks';
import { StyledLogin } from './styles';

export const Login = memo(() => {
  const { handlers, selectors } = useHooks();
  const { onFinish, onFinishFailed } = handlers;
  const { status } = selectors;
  const { t } = useTranslation();

  return (
    <StyledLogin>
      <Form
        className="login-form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Title className="login-form-title">{t('Login.title')}</Title>
        <Form.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: t('Login.messageInvalidEmail'),
            },
            {
              required: true,
              message: t('Login.messageEmptyEmail'),
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('Login.messageEmptyPassword'),
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item className="login-form-forgot">
          <Link to="/forgot-password"> {t('Login.forgotPassword')} </Link>
        </Form.Item>
        <Form.Item className="login-form-button login-form-button-local">
          <Button
            type="accent"
            htmlType="submit"
            loading={status === ACTION_STATUS.PENDING}
          >
            {t('Login.btnLogin')}
          </Button>
        </Form.Item>
      </Form>
    </StyledLogin>
  );
});

export default Login;
