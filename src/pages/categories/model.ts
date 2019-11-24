import { Reducer } from 'redux';
import { Effect } from 'dva';
import { ListData } from '@/dataTypes/common';
import { CategoryListItem } from '@/dataTypes/listItem';

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
      console.log(payload);
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
export default CategoryModel;
