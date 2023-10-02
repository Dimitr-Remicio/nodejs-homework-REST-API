const express = require("express");

const ctrl = require(`../../controllers/contacts`);
const ctrlU = require(`../../controllers/users`);

const { ctrlWrapper } = require('../../helpers');
const { auth } = require('../../middlewares');

const router = express.Router();
const invalidatedTokens = new Set();


const validToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (invalidatedTokens.has(token)) {
    return res.status(401).json({
      status: "error",
      code: 401,
      message: "Unauthorized: Invalid token",
      data: "Unauthorized",
    });
  }
  next();
};

const logout = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  invalidatedTokens.add(token);
  console.log(Array.from(invalidatedTokens));
  res.status(204).json({
    status: "successs",
    code: 204,
    message: "Logout: successful",
    data:"success"
  });
};

router.post("/users/signup", ctrlWrapper(ctrlU.signup));
router.post("/users/login", ctrlWrapper(ctrlU.login));
router.get("/users/current", validToken, auth, ctrlWrapper(ctrlU.me));
router.post("/users/logout", validToken, auth, logout);

router.get("/contacts", validToken, auth, ctrlWrapper(ctrl.userAllContacts));
router.get("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.getContactById));
router.post("/contacts/", validToken, auth, ctrlWrapper(ctrl.addContact));
router.delete("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.removeContact));
router.put("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.updateContactById));
router.patch("/contacts/:contactId/favorite", validToken, auth, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
