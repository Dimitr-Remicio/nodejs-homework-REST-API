const express = require("express");


const ctrl = require(`../controllers/contacts`);
const register = require(`../controllers/authctrl/signup`);
const login = require(`../controllers/authctrl/login`);

const { ctrlWrapper } = require('../helpers');

const { auth } = require('../middlewares');

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

router.post("/users/  ", register);
router.post("/users/login", login);
// router.get("/users/current", validToken, auth, ctrlWrapper(ctrl.getCurrent));
router.post("/users/logout", validToken, auth, (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  invalidatedTokens.add(token);
  console.log(Array.from(invalidatedTokens));
  res.status(204).json({
    status: "successs",
    code: 200,
    message: "Successfully logout",
    data: "Success",
  });
});

router.get("/contacts/", validToken, auth, ctrlWrapper(ctrl.getAllContacts));

router.get("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.getContactById));

router.post("/contacts/", validToken, auth, ctrlWrapper(ctrl.addContact));

router.delete("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.removeContact));

router.put("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.updateContactById));

router.patch("/contacts/:contactId/favorite", validToken, auth, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
