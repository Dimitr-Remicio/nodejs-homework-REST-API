const login = require("./login");
const signup = require("./signup");

const getCurrent = require("./getCurrent");
const me = require("./me");

const updateAvatar = require("./updateAvatar");
const updateUserSubscription = require("./updateUserSubscription");

const emailVerify = require("./emailVerify");
const resendVerificationEmail = require("./resendEmail");

module.exports = {
  login,
  me,
  signup,
  getCurrent,
  updateAvatar,
  updateUserSubscription,
  emailVerify,
  resendVerificationEmail,
};
