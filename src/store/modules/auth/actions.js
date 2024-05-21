let timer;

export default {
  login(ctx, payload) {
    return ctx.dispatch('auth', {
      ...payload,
      isLoginMode: true,
    });
  },

  signup(ctx, payload) {
    return ctx.dispatch('auth', {
      ...payload,
      isLoginMode: false,
    });
  },

  async auth(ctx, payload) {
    const isLoginMode = payload.isLoginMode;
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsXTvTLGFq24KxVB5hJeNGiUM7Gh4cuTM';
    if (!isLoginMode) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsXTvTLGFq24KxVB5hJeNGiUM7Gh4cuTM';
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const resData = await res.json();
    if (!res.ok) {
      const err = new Error(resData.message || 'Failed to authenticate.');
      throw err;
    }

    const expiresIn = resData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', resData.idToken);
    localStorage.setItem('userID', resData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      ctx.dispatch('autoLogout');
    }, expiresIn);

    ctx.commit('setUser', {
      token: resData.idToken,
      userID: resData.localId,
    });
  },

  autoLogin(ctx) {
    const token = localStorage.getItem('token');
    const userID = localStorage.getItem('userID');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 10000) {
      return;
    }

    timer = setTimeout(() => {
      ctx.dispatch('autoLogout');
    }, expiresIn);

    if (token && userID) {
      ctx.commit('setUser', {
        token,
        userID,
      });
    }
  },

  logout(ctx) {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    ctx.commit('setUser', {
      token: null,
      userID: null,
    });
  },

  autoLogout(ctx) {
    ctx.dispatch('logout');
    ctx.commit('setAutoLogout');
  },
};
