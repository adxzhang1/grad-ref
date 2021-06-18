const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { authRouter, todoRouter } = require('./routes');
const ENV = require('./env');

const runServer = () => {
  const app = express();

  // configs
  app.use(express.json());
  app.use(cookieParser());

  // serve client
  app.use(express.static(path.join(__dirname, '../client')));

  // routers
  app.use('/auth', authRouter);
  app.use('/todos', todoRouter);

  // 404
  app.use((req, res, next) => {
    res.status(404).json({ message: 'nothing here' });
  });

  // error handler
  app.use((err, req, res, next) => {
    console.log(err.message);
    res.status(err.statusCode).json({
      message: err.message,
    });
  });

  // connect database
  return mongoose
    .connect(ENV.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      // start server
      return app.listen(ENV.PORT, () => {
        console.log(`Server listening on port ${ENV.PORT}...`);
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  runServer,
};
