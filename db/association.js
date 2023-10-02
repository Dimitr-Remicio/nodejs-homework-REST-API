const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();
const MONGODB_URI = process.env.DB_HOST;

const association = mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = association;
