import { Effect } from 'dva';
import { queryCategories } from '@/services/category';
import { DefaultPagination } from './common';
import { Reducer } from 'redux';

export interface Category {
  id: number;
  title: string;
  type: 'person' | 'company';
  utilityRule: string;
  // 默认的其他收费规则，作为入住记录收费规则的参考
  chargeRule: CategoryChargeRule[];
  remark: string;
}

export interface CategoryChargeRule {
  name: string;
  fee: Array<number>;
}

export interface CategoryModelState {
  data: {
    list: Category[];
    pagination: Partial<DefaultPagination>;
  };
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    fetch: Effect;
  };
  reducers: {
    changeCategories: Reducer<CategoryModelState>;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryCategories, payload);
      const data = response.data;
      yield put({
        type: 'changeCategories',
        payload: data,
      });
    },
    // *add({ payload, callback }, { call, put }) {
    //   const response = yield call(addRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *remove({ payload, callback }, { call, put }) {
    //   const response = yield call(removeRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
    // *update({ payload, callback }, { call, put }) {
    //   const response = yield call(updateRule, payload);
    //   yield put({
    //     type: 'save',
    //     payload: response,
    //   });
    //   if (callback) callback();
    // },
  },
  reducers: {
    changeCategories(state, { payload }) {
      return {
        ...state,
        data: payload || [],
      };
    },
  },
};

export default CategoryModel;
