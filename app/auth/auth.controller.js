var User = require('../user/user.model');
var jwt = require("jsonwebtoken");
var config = require("../../config");
var passport = require("passport");
var randToken = require("rand-token");

var activeTokens = [];

var getAuthTokenJsonResponse = function (user) {

    var token = jwt.sign(user.toJSON(), config.secret, {
        expiresIn: '1 day'
    });
    var refreshToken = randToken.uid(256);
    activeTokens[ refreshToken ] = user._id;
    return { token: token, refreshToken: refreshToken };
};

exports.authenticate = function(req, res) {

    var name = req.body.username;
    if (!name) {
        res.status(400).send({ reason: 'BadRequest', message: 'field "name" is required.' });
        return;
    }

    User.findOne({
        name: name
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(404).send({ reason: 'NotFound', message: 'requested "username" not found.' });
        } else {

            user.comparePassword(req.body.password, function(err, isMatch) {
                if (isMatch && !err) {

                    res.json( getAuthTokenJsonResponse(user) );
                } else {
                    res.status(401).send({ reason: 'Unauthorized', message: 'user is not authorized.' });
                }
            });
        }
    });
};

exports.refreshToken = function (req, res) {

    var refreshToken = req.body.refreshToken;
    var userId = req.body.id;

    if((refreshToken in activeTokens) && (activeTokens[ refreshToken ] == userId)) {

        User.findOne({
            _id: userId
        }, function (err, user) {

            if (!user) {
                res.status(404).send({ reason: 'NotFound', message: 'requested "username" not found.' });
            } else {

                res.json( getAuthTokenJsonResponse(user) );
            }
        });
    }
    else {
        res.status(401).send({ reason: 'Unauthorized', message: 'user is not authorized.' });
    }
};

exports.revokeToken = function (req, res) {

    var refreshToken = req.body.refreshToken;
    var userId = req.body.id;

    if((refreshToken in activeTokens) && (activeTokens[ refreshToken ] === userId)) {
        delete activeTokens[refreshToken];
        res.send(204);
    }else{
        res.send(304);
    }
};

exports.isAuthenticated = passport.authenticate('jwt', { session: false });
