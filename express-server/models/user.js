var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'The value of path {PATH} ({VALUE}) is not a valid email.']
    },
    password: {
        type: String,
    },
    username: {
        type: String
    },
    name: {
        type: String
    },
    profileimage: {
        type: String
    }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password );
};

module.exports = mongoose.model('User', userSchema);