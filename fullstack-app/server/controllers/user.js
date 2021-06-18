const bcrypt = require('bcrypt');
const { UserModel } = require('../models');

const userController = {};

// handle login
userController.login = (req, res, next) => {
  // get from the request body
  const { email, password } = req.body;

  // find a user with the given email
  return UserModel.findOne({ email })
    .then((user) => {
      // error if no user found
      if (!user) {
        return next({
          message: 'user with email not found',
          statusCode: 400,
        });
      }

      // store the user on res.locals so other middleware have access to it
      res.locals.user = user;

      // check if password is correct
      return bcrypt.compare(password, user.password);
    })
    .then((passwordIsValid) => {
      // error if password is not valid
      if (!passwordIsValid) {
        return next({
          message: 'password is invalid',
          statusCode: 400,
        });
      }

      // go to next middleware
      return next();
    })
    .catch((err) => {
      // catch all other errors
      console.log(err);

      next({
        message: 'failed logging in',
        statusCode: 500,
      });
    });
};

// handle sign up
userController.signUp = (req, res, next) => {
  // get from the request body
  const { email, password } = req.body;

  // find a user with the given email
  return UserModel.findOne({ email })
    .then((user) => {
      // error if user already exists
      if (user) {
        return next({
          message: 'user with email already exists',
          statusCode: 400,
        });
      }

      // hash the password
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      // create a new user
      return UserModel.create({
        email,
        password: hashedPassword,
      });
    })
    .then((user) => {
      // store the user on res.locals so other middleware have access to it
      res.locals.user = user;

      // go to next middleware
      return next();
    })
    .catch((err) => {
      // catch all other errors
      console.log(err);

      next({
        message: 'failed signing up',
        statusCode: 500,
      });
    });
};

// logout
userController.logout = (req, res, next) => {
  // delete the cookie
  res.clearCookie('ssid');

  // go to next middleware
  next();
};

// set the cookie, will be used after valid login/signup
userController.setCookie = (req, res, next) => {
  // no user on res.locals
  if (!res.locals.user) {
    return next({
      message: 'no user available',
      statusCode: 500,
    });
  }

  // we're expecting a user on res.locals
  const userId = res.locals.user._id;

  // set the cookie
  res.cookie('ssid', userId);

  // go to next middleware
  next();
};

// verify user
// pretend verifying a user is checking if the request has a cookie called
// ssid, which will be the user id, and seeing if there is a user in the
// database for that id
userController.verify = (req, res, next) => {
  // we're expecting a ssid on the cookies that is the userId
  const userId = req.cookies.ssid;

  // error if no cookie
  if (!userId) {
    return next({
      message: 'not logged in',
      statusCode: 400,
    });
  }

  // find a user with the id
  return UserModel.findOne({ _id: userId })
    .then((user) => {
      // error if could not find a user
      if (!user) {
        return next({
          message: 'invalid credentials',
          statusCode: 400,
        });
      }

      // store the user on res.locals so other middleware have access to it
      res.locals.user = user;
      res.locals.userId = user._id;

      return next();
    })
    .catch((err) => {
      // catch all other errors
      console.log(err);

      next({
        message: 'failed to verify',
        statusCode: 500,
      });
    });
};

module.exports = {
  userController,
};
