const express = require("express");
const router = express.Router();
const {
    dashboardData,PlayerList
} = require("../controlers/dashboardController");
const { verifyUser } = require("../middleware/isVerify");
router.get("/test", (req, res) => {
  res.send("i am from testing");
});

router.get('/dashBoard',verifyUser,dashboardData);
router.get('/details',verifyUser,PlayerList)
module.exports = router;