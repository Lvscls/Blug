const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");


router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

router.get('/google/redirect', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/verify?token=' + req.authInfo.token);
  }
);

router.get('/github', passport.authenticate('github'));

router.get('/github/redirect', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/verify?token=' + req.authInfo.token);
  }
);

router.post("/register", authController.signup);

router.post("/login", authController.login);

router.post("/generate-qrcode", authController.generateQRCode);

router.post("/verify-token", authController.verifyToken);

router.post("/logout-all", authController.logoutAll);

module.exports = router;
