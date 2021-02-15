import { GetterTree } from 'vuex';
import { RootState } from '@/store';

import {
  IUsersState,
  USERS_GET_ALL,
  USERS_GET_ALL_LIST,
  USERS_GET_ONE,
  IUserList
} from './types';

export const getters: GetterTree<IUsersState, RootState> = {
  [USERS_GET_ALL]: (state) => {
    return state.users;
  },

  [USERS_GET_ALL_LIST]: (state) => {
    const list: IUserList[] = [];

    for (const U of state.users) {
      list.push({ text: `${U.lastName} ${U.firstName}`, value: U.id });
    }

    return list;
  },

  [USERS_GET_ONE]: (state) => {
    return (id: string) => {
      return state.users.find((v) => v.id === id);
    };
  }
};
