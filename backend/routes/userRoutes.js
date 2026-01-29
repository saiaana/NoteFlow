const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/check-auth", authController.protect, authController.checkAuth);
router.post("/demo-login", authController.createAndLoginDemoUser);

module.exports = router;
