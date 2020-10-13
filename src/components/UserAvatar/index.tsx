import styles from './index.less';
import React, { useEffect,useRef, useState } from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { connect } from 'dva';
import { UserState } from '@/models/connect';
import { history } from 'umi';
import { pageLogin } from '@/utils/utils';
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  SnippetsOutlined,
  EditOutlined,
  HomeOutlined
} from '@ant-design/icons';
interface ComHeaderProps {
  user: UserState;
  from:string
}



const UserAvatar: React.FC<ComHeaderProps> = props => {
  const { user,from } = props;
  const userInfo: any = user.userInfo;
  const [avamenus,setmenus] = useState<any>()
  useEffect(()=>{
    initMenu()
  },[])
  const handleMenuClick = (v: any) => {
    const key = v.key;
    if (key === '0') {
      history.push('/');
    }
    if (key === '1') {
      history.push('/');
    }
    if (key === '2') {
      history.push('/userPage');
    }
    if (key === '3') {
      history.push('/settings');
    }
    if (key === '4') {
      pageLogin();
    }
    if (key === '5') {
      history.push('/write');
    }
  };
  const initMenu = () => {
    const m =  (
      <Menu onClick={handleMenuClick}>
      {
        from==='w'?
        <Menu.Item key='0' icon={<HomeOutlined />}>
        首页
        </Menu.Item>:''
      }
      {
        from==='h'?
        <Menu.Item key='5' icon={<EditOutlined />}>
        写文章
        </Menu.Item>:''
      }
      <Menu.Item key="1" icon={<SnippetsOutlined />}>
        草稿箱
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        我的主页
      </Menu.Item>
      <Menu.Item key="3" icon={<SettingOutlined />}>
        设置
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />}>
        登出
      </Menu.Item>
    </Menu>
    )
    setmenus(m)
  }

  return (
    <>
      <Dropdown overlay={avamenus} trigger={['click']} placement="bottomRight">
        <Avatar
          className='cp'
          shape="circle"
          size={32}
          src={userInfo.avatar}
        />
      </Dropdown>
    </>
  );
};

export default connect(({ user }: { user: UserState }) => ({
  user,
}))(UserAvatar);
