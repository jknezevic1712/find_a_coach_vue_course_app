import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
  },
  state() {
    return {
      userID: 'c3',
    };
  },
  getters: {
    userID(state) {
      return state.userID;
    },
  },
});

export default store;
