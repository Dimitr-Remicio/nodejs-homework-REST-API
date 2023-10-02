// const { basedir } = global;
const ContactModel = require('../../models/contact');
const { createError } = require('../../helpers');
require("dotenv").config();

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactModel.findByIdAndRemove(contactId);

    if (!result) {
      throw createError(404);
    }

    res.json({
      message: "deleted",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = removeContact;
