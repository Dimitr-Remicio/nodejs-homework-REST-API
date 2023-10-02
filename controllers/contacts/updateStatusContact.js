// const { basedir } = global;
const { ContactModel, schemas } = require('../../models/contact');
const { createError } = require('../../helpers');
require("dotenv").config();

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = schemas.updateFavorite.validate(req.body);

    if (error) {
      throw createError(400, "missing field favorite");
    }

    const { contactId } = req.params;
    const result = await ContactModel.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });

    if (!result) {
      throw createError(404);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateStatusContact;
