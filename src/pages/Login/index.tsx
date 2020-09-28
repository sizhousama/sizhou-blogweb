import React, { useEffect, useCallback } from 'react';
import styles from './index.less';
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { Dispatch, History } from 'umi';
import { UserState } from '@/models/connect';

interface LoginProps {
  dispatch: Dispatch;
  history: History;
  userInfo: UserState;
}

const Login: React.FC<LoginProps> = props => {
  const { dispatch, history } = props;
  const login = (form: object) => {
    if(dispatch){
      dispatch({
        type: 'user/signin',
        payload: form,
        callback() {
          dispatch({
            type: 'user/userinfo',
          });
        },
      });
    }
    
  };

  useEffect(() => {
  }, []);
  return (
    <>
      <div className={`fl ${styles.loginbody}`}>
        <div className={styles.loginbox}>
          <div className={styles.title}>Sign In</div>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={login}
          >
            <Form.Item
              label=""
              name="email"
              rules={[{ required: true, message: '请输入邮箱！' }]}
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

            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                <Button
                  className={styles.submit}
                  type="primary"
                  htmlType="submit"
                >
                  登录
                </Button>
              </Col>
            </Row>
            <Row><Col span={24} style={{ textAlign: 'right' }}>
              <a onClick={()=>history.push('/register')}>注册</a>
            </Col></Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default connect(
  ({user}:{user:UserState})=>({
    user
  })
)(Login);
