import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ListData } from '@/models/common';
import { query, store } from '@/services/room';
import { RoomListItem } from './data';

export interface ModelType {
  namespace: 'rooms';
  state: ModelState;
  effects: {
    fetch: Effect;
    add: Effect;
    update: Effect;
    remove: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
    append: Reducer<ModelState>;
  };
}

export interface ModelState {
  data: ListData<RoomListItem>;
}

const Model: ModelType = {
  namespace: 'rooms',
  state: {
    data: {
      list: [],
      pagination: {},
    },
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(query, payload);
      yield put({ type: 'save', payload: response.data });
    },
    *add({ payload, callback }, { call, put }) {
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
    *update({ payload, callback }, { call, put }) {},
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
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
