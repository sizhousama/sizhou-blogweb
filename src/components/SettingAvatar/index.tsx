import React, { useState } from 'react';
import styles from './index.less';
import { Button, Upload, message } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { Dispatch } from 'umi';
import { UserState } from '@/models/connect';
import ImgCrop from 'antd-img-crop';
import 'antd/es/modal/style';
import { getToken } from '@/utils/utils';

interface AvatarProps {
  dispatch: Dispatch;
  user: UserState;
}

// 上传图片限制
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传jpe/jpeg/png格式的图片！');
  }
  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error('图片大小必须小于3M！');
  }
  return isJpgOrPng && isLt3M;
}

const SettingAvatar: React.FC<AvatarProps> = props => {
  const { dispatch, user } = props;
  const userInfo: any = user.userInfo;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImgUrl] = useState(userInfo.avatar);
  const token = getToken();
  const headers: any = token ? { token } : {};
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const avatar = info.file.response.data.url
      dispatch({
        type: 'user/updateUser',
        payload: {avatar},
        callback(data) {
          setImgUrl(data.avatar);
        },
      });
    }
  };

  return (
    <>
      <div>
        <div className={styles.image}>
          {loading ? <LoadingOutlined /> : <img src={imageUrl} />}
        </div>
        <div className={styles.uplimit}>
          支持 jpg、jpeg、png格式，大小 3M 以内的图片
        </div>
        <ImgCrop>
          <Upload
            name="upava"
            showUploadList={false}
            action={`${process.env.BASE_URL}/util/upload`}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={headers}
          >
            <Button type="primary">点击上传</Button>
          </Upload>
        </ImgCrop>
      </div>
    </>
  );
};

export default connect(({ user }: { user: UserState }) => ({
  user,
}))(SettingAvatar);
