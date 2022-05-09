import React, { useState } from 'react';
import { connect } from 'dva';
import { UserState } from '@/models/connect';
import { Form, Input, Button, Row, Col } from 'antd';
import { Dispatch } from 'umi';

interface SettingPassProps {
  dispatch: Dispatch;
}

const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const SettingPass: React.FC<SettingPassProps> = props => {
  const { dispatch } = props;
  const upPass = (values: any) => {
    dispatch({ type: 'user/repassword', payload: values });
  };

  return (
    <>
      <Form
        {...layout}
        name="settingpass"
        initialValues={{ remember: true }}
        onFinish={upPass}
      >
        <Form.Item label="原密码" name="oldpassword" labelAlign="left">
          <Input.Password
            bordered={false}
            visibilityToggle={false}
            placeholder="填写原密码"
          />
        </Form.Item>
        <Form.Item label="新密码" name="newpassword" labelAlign="left">
          <Input.Password
            bordered={false}
            visibilityToggle={false}
            placeholder="填写新密码"
          />
        </Form.Item>
        <Form.Item label="确认新密码" name="renewpassword" labelAlign="left">
          <Input.Password
            bordered={false}
            visibilityToggle={false}
            placeholder="确认新密码"
          />
        </Form.Item>
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default connect(({ user }: { user: UserState }) => ({
  user,
}))(SettingPass);
