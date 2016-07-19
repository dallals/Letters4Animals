// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var models            = require('../models');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        models.User.find({where: ["id = ?", id]}).then(function(data){
            done(null, data.dataValues);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        models.User.find({where: ["email = ?", email]}).then(function(user){

            //////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////
            // FOR DEV/TESTING PURPOSES ONLY. DELETE BEFORE DEPLOYMENT////
            if(email == 'test@test.com'){                             ////
                return done(null, user.dataValues);                   ////
            }                                                         ////
            //////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////////

            // if no user is found, return the message
            if (!user){
                console.log('in user errors');
                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            }

            if (user.validPassword(password)){
                // all is well, return successful user
                new_login_count = user.dataValues.login_count + 1
                user.update({login_count: new_login_count, last_login: new Date()});
                return done(null, user.dataValues);
            }
            else {
                return done(null, {error: 'Bad Password'});
            }

            // if( user.dataValues.password == password){
            //     // all is well, return successful user
            //     new_login_count = user.dataValues.login_count + 1
            //     user.update({login_count: new_login_count});
            //     return done(null, user.dataValues);
            // }
            // else {
            //     return done(null, {error: 'Bad Password'});
            // }
        })

    }));    // End of Local Login strategy


};
