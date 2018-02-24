var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');


module.exports = function (passport) {
    passport.serializeUser(function (user, cb) {
        cb(null, user.id);
    });

    passport.deserializeUser(function (id, cb) {
        User.findById(id, function (err, user) {
            cb(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, cb) {
            User.findOne({
                email: email
            }, function (err, user) {
                if (err) {
                    return cb(err);
                }
                if (!user) {
                    // return cb(null, false, {
                    //     message: 'Incorrect username.'
                    // });
                    return cb(null, false, req.flash('loginMessage', 'Incorrect username.'));
                }
                if (!user.validPassword(password)) {
                    // return cb(null, false, {
                    //     message: 'Incorrect password.'
                    // });
                    return cb(null, false, req.flash('loginMessage', 'Incorrect password !'));
                }
                return cb(null, user);
            });
        }
    ));

    passport.use('register', new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true
        },
        function (req, email, password, cb) {
            User.findOne({
                email: email
            }, function (err, user) {
                if (err) {
                    return cb(err);
                }
                if (user) {
                    return cb(null, false, req.flash('registerMessage', 'Email is already taken...'));
                } else {
                    var newUser = new User();
                    newUser.email = email;
                    newUser.password = newUser.generateHash(password);
                    newUser.save(function (err) {
                        // if(err) return cb(err);
                        if (err) {
                            console.log(err);
                            return cb(null, false, req.flash('registerMessage', err.message));
                        } else {

                            return cb(null, newUser);
                        }
                    });
                    // newUser.save().then(res => {
                    //     res.json(res);
                    // }).catch((e) => {
                    //     res.status(500).send(e);
                    // })
                }
            });
        }
    ));
}