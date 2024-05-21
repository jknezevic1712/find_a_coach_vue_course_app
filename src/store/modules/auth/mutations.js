export default {
  setUser(s, payload) {
    s.token = payload.token;
    s.userID = payload.userID;
    s.didAutoLogout = false;
  },
  setAutoLogout(s) {
    s.didAutoLogout = true;
  },
};
