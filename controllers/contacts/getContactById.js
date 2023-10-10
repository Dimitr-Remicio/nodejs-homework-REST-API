const ContactModel = require('../../schemas/contact');
// const { createError } = require(`${basedir}/helpers`);

require("dotenv").config();
const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await ContactModel.findById(contactId);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
      // throw createError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getContactById;
