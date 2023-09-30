
const Contact = require('../../models/contact');

const userAllContacts = async (req, res, next) => {
  try {
    // Desestructuración para obtener el ID del usuario
    const { id: owner } = req.user;

    const result = await Contact.find({ owner });

    res.status(200).json(result);
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = userAllContacts;

