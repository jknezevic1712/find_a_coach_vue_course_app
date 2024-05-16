export default {
  registerCoach(ctx, data) {
    const coachData = {
      id: ctx.rootGetters.userID,
      firstName: data.first,
      lastName: data.last,
      description: data.desc,
      hourlyRate: data.rate,
      areas: data.areas,
    };

    ctx.commit('registerCoach', coachData);
  },
};
