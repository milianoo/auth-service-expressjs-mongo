// Bring Mongoose into the app 
var mongoose = require( 'mongoose' );
var config = require('./config');

// Build the connection string 
var dbURI = config.mongodbPath + config.databaseName;

mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection open to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});

module.exports = {
    connect: function () {
        mongoose.connect(dbURI, function (err) {
            if (err) {
                throw Error(err);
            }
        }).then(function () {
            console.info('Mongoose connected to mongodb instance.');
        });
    }
};