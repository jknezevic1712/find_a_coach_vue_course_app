export default {
  userID(s) {
    return s.userID;
  },
  token(s) {
    return s.token;
  },
  isAuthenticated(s) {
    return !!s.token;
  },
};
