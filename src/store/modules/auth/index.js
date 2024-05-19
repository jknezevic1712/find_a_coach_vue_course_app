import mutations from './mutations';
import actions from './actions';
import getters from './getters';

export default {
  state() {
    return {
      userID: null,
      token: null,
      tokenExpiration: null,
    };
  },
  getters,
  actions,
  mutations,
};
