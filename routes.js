
var users = require('./app/user/users.route');
var auth = require('./app/auth/auth.route');

exports.setup = function (app) {

    var basePath = '/api';
    var getPath = function (path) {
        return basePath + path;
    };

    app.use( getPath('/users'), users);
    app.use( getPath('/authenticate'), auth);
};

