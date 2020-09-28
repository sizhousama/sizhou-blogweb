import React, { useEffect } from 'react';
import styles from './index.less';
import { Row, Col, Tabs } from 'antd';
import SettingInfo from '@/components/SettingInfo'
import SettingAvatar from '@/components/SettingAvatar'
import SettingPass from '@/components/SettingPass'
const Settings: React.FC = props => {
  const { TabPane } = Tabs;
  return (
    <>
      <Row>
        <Col span={24}>
          <div className={styles.settingbody}>
            <Tabs defaultActiveKey="1">
              <TabPane tab="个人信息" key="1">
                <SettingInfo></SettingInfo>
              </TabPane>
              <TabPane tab="头像设置" key="2">
                <SettingAvatar></SettingAvatar>
              </TabPane>
              <TabPane tab="账号密码" key="3">
                <SettingPass></SettingPass>
              </TabPane>
            </Tabs>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Settings;
