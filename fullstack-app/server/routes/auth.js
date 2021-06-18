const { Router } = require('express');
const { userController } = require('../controllers');

const router = Router();

// login
router.post(
  '/login',
  userController.login, // try logging in user
  userController.setCookie, // set the ssid cookie
  (req, res) => {
    res.status(200).json({ user: res.locals.user });
  }
);

// sign up
router.post(
  '/signup',
  userController.signUp, // try signing up user
  userController.setCookie, // set the ssid cookie
  (req, res) => {
    res.status(200).json({ user: res.locals.user });
  }
);

// logout
router.post('/logout', userController.logout, (req, res) => {
  res.status(200).json({});
});

module.exports = {
  authRouter: router,
};
