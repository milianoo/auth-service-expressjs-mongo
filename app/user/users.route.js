var express = require('express');
var router = express.Router();
var userController = require('./users.controller');
var authController = require('../auth/auth.controller');

router
    .route('/')
    .post(userController.postUser)
    .get(authController.isAuthenticated, userController.getUsers);

router
    .route('/:id')
    .get(authController.isAuthenticated, userController.getUser)
    .put(authController.isAuthenticated, userController.putUser)
    .delete(authController.isAuthenticated, userController.deleteUser);

module.exports = router;

