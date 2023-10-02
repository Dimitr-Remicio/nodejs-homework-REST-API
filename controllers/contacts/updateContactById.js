
const ContactModel = require('../../models/contact');
const { createError } = require('../../helpers');
require("dotenv").config();
const updateContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactModel.findByIdAndUpdate(contactId, req.body, { new: true });

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateContactById;
