const register = require("./register");
const login = require("./login");
const me = require("./me");
const signup = require("./signup");
const getCurrent = require("./getCurrent");
// const logout = require("./logout");
const updateUserSubscription = require("./updateUserSubscription");

module.exports = {
  register,
  login,
  me,
  signup,
  getCurrent,
  // logout,
  updateUserSubscription,
};
