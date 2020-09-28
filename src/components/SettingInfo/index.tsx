import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Form, Input, Button, Row, Col } from 'antd';
import { connect } from 'dva';
import { UserState } from '@/models/connect';
import {Dispatch} from 'umi'
interface SettingInfoProps{
  dispatch:Dispatch,
  user:UserState
}


const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const SettingInfo: React.FC<SettingInfoProps> = props => {
  const {dispatch,user} = props
  const [userInfo,setUserInfo] = useState<any>(user.userInfo)
  const upUser = (values: any) => {
    dispatch({type:'user/updateUser',payload:values,callback(data){
      setUserInfo(data)
    }})
  };
  useEffect(()=>{
    console.log(userInfo)
  },[])

  return (
    <>
      <Form
        {...layout}
        name="InfoForm"
        initialValues={userInfo}
        onFinish={upUser}
        className={styles.userinfo}
      >
        <Form.Item label="用户名" name="username" labelAlign="left">
          <Input bordered={false} placeholder="填写你的昵称"  />
        </Form.Item>
        <Form.Item label="职业" name="profession" labelAlign="left">
          <Input bordered={false} placeholder="填写你的职业"  />
        </Form.Item>
        <Form.Item label="个人简介" name="summary" labelAlign="left">
          <Input bordered={false} placeholder="填写你的职业技能，擅长的事情，爱好等"  />
        </Form.Item>
        <Form.Item label="个人主页" name="website" labelAlign="left">
          <Input bordered={false} placeholder="填写你的个人主页"  />
        </Form.Item>
        <Form.Item label="github" name="github" labelAlign="left">
          <Input bordered={false} placeholder="填写你的github"  />
        </Form.Item>
        <Form.Item label="gitee" name="gitee" labelAlign="left">
          <Input bordered={false} placeholder="填写你的gitee" />
        </Form.Item>
        <Form.Item label="微博" name="weibo" labelAlign="left">
          <Input bordered={false} placeholder="填写你的微博" />
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

export default connect(
  ({user}:{user:UserState})=>({
    user
  })
)(SettingInfo);
