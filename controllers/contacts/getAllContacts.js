// const { basedir } = global;
const { Contact } = require('../../models/contact');
require("dotenv").config();

const getAllContacts = async (req, res, next) => {
  try {
  const result = await Contact.find();
  res.status(200).json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = getAllContacts;
