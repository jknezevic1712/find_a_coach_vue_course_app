export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches && state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userID = rootGetters.userID;

    return coaches.some((c) => c.id === userID);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;
    if (!lastFetch) {
      return true;
    }

    const currentTimestamp = new Date().getTime();
    return (currentTimestamp - lastFetch) / 1000 > 60;
  },
};
