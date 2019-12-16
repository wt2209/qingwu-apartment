import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ListData } from '@/models/common';
import { BillListItem } from './data';
import { query, store, update } from './service';

export interface ModelState {
  data: ListData<BillListItem>;
}

export interface ModelType {
  namespace: 'bills';
  state: ModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
    remove: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
    update: Reducer<ModelState>;
    append: Reducer<ModelState>;
  };
}

const Model: ModelType = {
  namespace: 'bills',
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
export default Model;
