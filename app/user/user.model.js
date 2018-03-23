var mongoose = require('mongoose');
var helper = require('./user.helper');

var UserSchema   = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: Number, required: true },
    password: { type: String, required: true }
});

UserSchema.pre('save', helper.encryptPassword);

UserSchema.methods.comparePassword = helper.comparePassword;

var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;