import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ListData } from '@/models/common';
import { query } from '@/services/person';
import { PersonListItem } from './data';

export interface ModelType {
  namespace: 'people';
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
  data: ListData<PersonListItem>;
}

const Model: ModelType = {
  namespace: 'people',
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
