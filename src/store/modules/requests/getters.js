export default {
  requests(state, _getters, _rootState, rootGetters) {
    const coachID = rootGetters.userID;
    return state.requests.filter((req) => req.coachID === coachID);
  },
  hasRequests(_state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
