import { Effect } from 'dva';
import { Reducer } from 'redux';
import { query, queryOptions } from './service';

export interface OptionsType {
  categories: Array<{ id: number; title: string; type: string }>;
  companies: Array<{ id: number; companyName: string }>;
}

export interface ModelState {
  // 下拉选项
  options: OptionsType;
}
export interface ModelType {
  namespace: 'livingsCreate';
  state: ModelState;
  effects: {
    getOptions: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ModelState>;
  };
}
const Model: ModelType = {
  namespace: 'livingsCreate',
  state: {
    options: {
      categories: [],
      companies: [],
    },
  },
  effects: {
    *getOptions({ payload, callback }, { put, call }) {
      const response = yield call(queryOptions);
      yield put({ type: 'save', payload: response.data });
    },
    *fetch({ payload, callback }, { put, call }) {},
  },
  reducers: {
    save(state, action) {
      const options = action.payload;
      return {
        options,
      };
    },
  },
};

export default Model;
