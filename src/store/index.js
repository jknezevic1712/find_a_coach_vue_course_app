import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

const store = createStore({
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
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
