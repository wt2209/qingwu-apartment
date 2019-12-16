import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ListData } from '@/models/common';
import { query, store, update } from './service';
import { CategoryListItem } from './data';

export interface CategoryModelType {
  namespace: 'categories';
  state: CategoryModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
    remove: Effect;
  };
  reducers: {
    save: Reducer<CategoryModelState>;
    update: Reducer<CategoryModelState>;
    append: Reducer<CategoryModelState>;
  };
}

export interface CategoryModelState {
  data: ListData<CategoryListItem>;
}

const CategoryModel: CategoryModelType = {
  namespace: 'categories',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, payload);
      yield put({ type: 'save', payload: response.data });
    },
    *add({ payload, callback }, { call, put }) {
      if (payload.id) {
        delete payload.id;
      }
      const response = yield call(store, payload);
      yield put({
        type: 'append',
        payload: response.data,
      });
      if (callback) {
        callback(response.status);
      }
    },
    *remove({ payload, callback }, { call, put }) {},
    *update({ payload, callback }, { call, put }) {
      const response = yield call(update, payload);
      yield put({
        type: 'update',
        payload: response.data,
      });
      if (callback) {
        callback(response.status);
      }
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
    update(state, action) {
      const newList = state
        ? state.data.list.map(item => (item.id === action.payload.id ? action.payload : item))
        : [];
      return {
        data: {
          list: newList,
          pagination: state ? state.data.pagination : {},
        },
      };
    },
    append(state, action) {
      const newList = state ? state.data.list : [];
      newList.unshift(action.payload);
      return {
        data: {
          list: newList,
          pagination: state ? state.data.pagination : {},
        },
      };
    },
  },
};
export default CategoryModel;
