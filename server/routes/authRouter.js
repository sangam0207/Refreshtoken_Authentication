const express = require("express");
const router = express.Router();
const {
  registerController,
  loginController,
  refreshToken,
  logout
} = require("../controlers/authController.js");
//const { verifyUser } = require("../middleware/isVerify.js");
router.get("/test", (req, res) => {
  res.send("i am from testing");
});
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/refresh-token", refreshToken);
router.get('/logout',logout);
module.exports = router;




