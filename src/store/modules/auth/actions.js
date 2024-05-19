export default {
  async login(ctx, payload) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsXTvTLGFq24KxVB5hJeNGiUM7Gh4cuTM`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      const err = new Error(resData.message || 'Failed to authenticate.');
      throw err;
    }

    ctx.commit('setUser', {
      token: resData.idToken,
      userID: resData.localId,
      tokenExpiration: resData.expiresIn,
    });
  },
  async signup(ctx, payload) {
    const res = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsXTvTLGFq24KxVB5hJeNGiUM7Gh4cuTM`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const resData = await res.json();
    if (!res.ok) {
      const err = new Error(resData.message || 'Failed to authenticate.');
      throw err;
    }

    ctx.commit('setUser', {
      token: resData.idToken,
      userID: resData.localId,
      tokenExpiration: resData.expiresIn,
    });
  },
};
