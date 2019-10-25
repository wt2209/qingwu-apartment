import { Reducer } from 'redux';
import { routerRedux } from 'dva/router';
import { Effect } from 'dva';
import { stringify } from 'querystring';

import { accountLogin, getFakeCaptcha } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';

export interface StateType {
  status?: 'ok' | 'error';
  type?: string;
  currentAuthority?: 'user' | 'guest' | 'admin';
  token?: string;
}

export interface LoginModelType {
  namespace: string;
  state: StateType;
  effects: {
    login: Effect;
    getCaptcha: Effect;
    logout: Effect;
  };
  reducers: {
    changeLoginStatus: Reducer<StateType>;
  };
}
const token: string = localStorage.getItem('token') || '';
const status: 'ok' | 'error' | undefined = token ? 'ok' : undefined;

const Model: LoginModelType = {
  namespace: 'login',

  state: {
    status,
    token,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const { autoLogin } = payload;
      const response = yield call(accountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          ...response,
          autoLogin,
        },
      });
      // Login successfully
      if (response.status === 'ok') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        } else {
          window.location.href = '/';
          return;
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },
    *logout(_, { put }) {
      const { redirect } = getPageQuery();
      // redirect
      if (window.location.pathname !== '/user/login' && !redirect) {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          }),
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      const token = payload.token || '';

      if (payload.autoLogin) {
        localStorage.setItem('token', token);
      }
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        currentAuthority: payload.currentAuthority,
        status: payload.status,
        type: payload.type,
        token,
      };
    },
  },
};

export default Model;
