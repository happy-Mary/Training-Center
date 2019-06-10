var FacebookTokenStrategy = require('passport-facebook-token');
var usersService = require('./services/usersService');

var settings = require('./settings');
var constants = require('./constants');
var bcrypt = require('bcrypt');
var crypto = require("crypto");

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and deserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        usersService.getUser(id)
            .then(user => done(null, usersService.getUserObject(user)))
            .catch(done);
    });

    passport.use(
        'facebook-token',
        new FacebookTokenStrategy({
            clientID: settings.server.facebook.appId,
            clientSecret: settings.server.facebook.appSecret
        },
            function (accessToken, refreshToken, profile, done) {
                var email = profile._json.email;
                if (!email) return done('Email is missing');
                // try to get user
                usersService.getUserByEmail(email).then(user => {
                    // if exists - return
                    if (user) return done(null, usersService.getUserObject(user));

                    //if not exists - create a new one and return
                    return usersService.insertUser({
                        email: email,
                        passwordHash: bcrypt.hashSync(crypto.randomBytes(5).toString('hex'), bcrypt.genSaltSync()),
                        first_name: profile._json.first_name,
                        last_name: profile._json.last_name,
                        role_id:  constants.userRole.user
                    })
                        .then(usersService.getUser)
                        .then(user => done(null, usersService.getUserObject(user)));
                }).catch(done);
            })
    );
};