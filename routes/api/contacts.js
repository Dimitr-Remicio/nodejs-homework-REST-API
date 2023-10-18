const express = require("express");

const ctrl = require(`../../controllers/contacts`);
const ctrlU = require(`../../controllers/users`);

const updateAvatar = require('../../controllers/avatar/updateAvatar');

const { ctrlWrapper } = require('../../helpers');
const { auth, upload } = require('../../middlewares');

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
router.post("/users/logout", validToken, auth, logout);
router.get("/users/current", validToken, auth, ctrlWrapper(ctrlU.me));
router.post("/upload-avatar", upload.single("avatar"), (req, res) => {
  res.status(200).json({ message: "Archivo subido exitosamente a la carpeta temporal" });
});
router.patch("/users/avatars",validToken, auth, upload.single("avatar"), ctrlWrapper(updateAvatar));
router.get("/users/verify/:verificationToken", validToken, ctrlWrapper(ctrlU.emailVerify));
router.post("/users/verify", ctrlWrapper(ctrlU.resendVerificationEmail));



router.get("/contacts", validToken, auth, ctrlWrapper(ctrl.userAllContacts));
router.get("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.getContactById));
router.post("/contacts/", validToken, auth, ctrlWrapper(ctrl.addContact));
router.delete("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.removeContact));
router.put("/contacts/:contactId", validToken, auth, ctrlWrapper(ctrl.updateContactById));
router.patch("/contacts/:contactId/favorite", validToken, auth, ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
