export default {
  contactCoach(ctx, payload) {
    const newReq = {
      id: new Date().toISOString(),
      coachID: payload.coachID,
      userEmail: payload.email,
      message: payload.message,
    };

    ctx.commit('addRequest', newReq);
  },
};
