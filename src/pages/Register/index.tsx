import React, { useEffect } from 'react';
import styles from './index.less';
import { Form, Input, Button, Row, Col, message } from 'antd';
import { connect } from 'dva';
import { Dispatch, History } from 'umi';
import { UserState } from '@/models/connect';

interface LoginProps {
  dispatch: Dispatch;
  history: History;
  userInfo: UserState;
  form: any;
}
interface REGFORM {
  email: string;
  password: string;
  repassword: string;
}

const Register: React.FC<LoginProps> = props => {
  const [form] = Form.useForm();
  const { dispatch, history } = props;

  const register = (form: REGFORM) => {
    if (dispatch) {
      dispatch({
        type: 'user/signup',
        payload: form,
      });
    }
  };

  return (
    <>
      <div className={`fl ${styles.regbody}`}>
        <div className={styles.regbox}>
          <div className={styles.title}>Sign Up</div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={register}
          >
            <Form.Item
              label=""
              name="email"
              rules={[
                {
                  type: 'email',
                  message: '请输入有效的电子邮箱',
                },
                { required: true, message: '请输入邮箱！' },
              ]}
            >
              <Input placeholder="请输入邮箱" />
            </Form.Item>

            <Form.Item
              label=""
              name="password"
              rules={[{ required: true, message: '请输入密码！' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
            <Form.Item
              label=""
              name="repassword"
              dependencies={['password']}
              rules={[
                { required: true, message: '请确认密码！' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次密码不一致');
                  },
                }),
              ]}
            >
              <Input.Password placeholder="请确认密码" />
            </Form.Item>

            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  注册
                </Button>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <a onClick={() => history.push('/login')}>已有账号，去登录</a>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default connect(({ User }: { User: UserState }) => ({
  User,
}))(Register);
