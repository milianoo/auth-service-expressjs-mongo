
var express = require('express');
var router = express.Router();

var authController = require('./auth.controller');


router
    .route('/')
    .post(authController.authenticate);

router
    .route('/token')
    .post(authController.refreshToken)
    .delete(authController.revokeToken);

module.exports = router;