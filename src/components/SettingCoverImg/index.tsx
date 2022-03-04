import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { Upload, message } from 'antd';
import { LoadingOutlined, DeleteFilled } from '@ant-design/icons';
import { getToken } from '@/utils/utils';
import 'antd/es/modal/style';

// 上传图片限制
function beforeUpload(file: any) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('只能上传jpe/jpeg/png格式的图片！');
  }
  const isLt3M = file.size / 1024 / 1024 < 5;
  if (!isLt3M) {
    message.error('图片大小必须小于5M！');
  }
  return isJpgOrPng && isLt3M;
}
interface ImgProps {
  setCoverImg: (img: string) => void;
  url: string;
}

const SettingCoverImg: React.FC<ImgProps> = props => {
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const token = getToken();
  const headers: any = token ? { token } : {};
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false);
      const Image = info.file.response.data.url;
      setImgUrl(Image);
      props.setCoverImg(Image);
    }
  };
  useEffect(() => {
    if (props.url !== '') {
      setImgUrl(props.url);
    }
  }, []);

  return (
    <>
      {imgUrl ? (
        <div className={styles.imgbox}>
          <img className={styles.image} src={imgUrl} />
          <div
            className={styles.del}
            onClick={() => {
              setImgUrl('');
              props.setCoverImg('');
            }}
          >
            <DeleteFilled />
          </div>
        </div>
      ) : (
        <Upload
          name="upcoverimg"
          showUploadList={false}
          action={`${process.env.BASE_URL}/util/upload`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          headers={headers}
        >
          <div className={styles.upload}>
            {loading ? <LoadingOutlined /> : '点击上传封面图'}
          </div>
        </Upload>
      )}
    </>
  );
};

export default SettingCoverImg;
