const express = require('express');
const {
  validateLoginBodyParams,
  validateCreateUserBody,
} = require('../../middleware/endpointValidator');
const {
  toResponseModel,
} = require('../users/mapper');

// eslint-disable-next-line new-cap
const router = express.Router({ mergeParams: true });

function init({ authService }) {
  router.post(
    '/register',
    validateCreateUserBody(),
    (async (req, res) => {
      const result = await authService.register({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      return res.send({
        data: toResponseModel(result),
      });
    }),
  );

  router.post(
    '/login',
    validateLoginBodyParams(),
    (async (req, res) => {
      const result = await authService.login({
        email: req.body.email,
        password: req.body.password,
      });
      return res.send({
        data: {
          token: result.token,
          user: toResponseModel(result.user),
        },
      });
    }),
  );

  return router;
}

module.exports.init = init;
