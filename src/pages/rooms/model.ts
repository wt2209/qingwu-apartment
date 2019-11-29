import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ListData } from '@/dataTypes/common';
import { RoomListItem } from '@/dataTypes/listItem';
import { query } from '@/services/room';

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
    *fetch({ payload, callback }, { call, put }) {
      const response = yield call(query, payload);
      yield put({ type: 'save', payload: response.data });
    },
    *add({ payload, callback }, { call, put }) {},
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
  },
};
export default Model;
