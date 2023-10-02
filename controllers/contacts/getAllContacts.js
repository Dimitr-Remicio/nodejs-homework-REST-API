const ContactModel = require("../../models/contact")
require("dotenv").config();


const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await ContactModel.find();
    res.status(200).json(contacts);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

module.exports = getAllContacts;