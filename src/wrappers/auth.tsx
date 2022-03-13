import React, { useEffect } from 'react';
import storageHelper from '@/utils/storage';
import { history } from 'umi';
import { connect } from 'dva';
import { Dispatch } from 'umi';
import { GlobalState } from '@/models/connect';
import { getBrowser } from '@/utils/utils';
interface AuthRouterProps {
  dispatch: Dispatch;
  children: any;
}

const AuthRouter: React.FC<AuthRouterProps> = (props: any) => {
  const { dispatch } = props;
  const m = getBrowser().isMobile;
  const initUser = () => {
    const user = storageHelper.get('user');
    if (!user || user.exp * 1000 < new Date().getTime()) {
      return false;
    }
    return user;
  };

  const userInfo = initUser();
  const pathname = history.location.pathname;
  const curnav = ['/', '/home'].includes(pathname) ? '0' : 'other';
  useEffect(() => {
    if (dispatch) {
      dispatch({ type: 'global/setCurNav', payload: curnav });
    }
  }, []);

  return <div>{props.children}</div>;
};

export default connect(({ global }: { global: GlobalState }) => ({
  global,
}))(AuthRouter);
