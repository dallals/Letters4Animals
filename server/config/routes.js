//
var users       = require('../controllers/users.js'),
    causes      = require('../controllers/causes.js'),
    reps        = require('../controllers/representatives.js'),
    contact     = require('../controllers/contactMailer.js'),
    addrConf    = require('../controllers/addressConfirmation.js'),
    passport    = require("passport");
    guests      = require('../controllers/guests.js'),
//
module.exports = function(app){

    //user queries for getting one user
    app.get('/confirmEmail/:link', function(req, res) {
        users.confirmEmail(req, res);
    })
    app.post('/confEmail', function(req, res){
        contact.confEmail(req, res);
    })

    //Register New User
    app.post('/users', function(req,res){
        users.create(req, res);
    })

    // contact us
    app.post('/contact', function(req,res){
        contact.contactMail(req, res);
    })

    //For Address Finding
    app.post('/addressConfirmation', function(req, res) {
        addrConf.confirmAddr(req, res);
    })
    //For Representative Finding
    app.post('/representatives', function(req, res) {
        reps.findReps(req, res);
    })

    //Grabbing single user info
    app.post('/getUserInfo', function(req, res) {
        users.getUserInfo(req, res);
    })
    //Updating user in DB
    app.post('/updateUser', function(req, res) {
        users.updateUser(req, res);
    })
    //Grabbing all users
    app.get('/getAllUsers', function(req, res) {
        users.getAllUsers(req, res);
    })
    //Deleting user, returning all remaining users
    app.post('/delUser', function(req, res) {
        users.delUser(req, res);
    })

    // Passport login
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            req.logIn(user, function(err) {
                return res.json(user);
            });
        })(req, res, next);
    });

    app.get('/logout', function(req, res){
        req.logout();
        res.send('Logout Ok');
    });

    app.get('/checkLogin', isLoggedIn, function(req, res){
        res.json(req.user);
    });

    app.get('/profile', isLoggedIn, function(req, res){
        res.redirect('/');
    })

    // Causes
    app.get('/getAllCauses', function(req, res){
        causes.getAllCauses(req, res);
    })
    app.get('/getEnabledCauses', function(req, res) {
        causes.getEnabledCauses(req, res);
    })

    app.post('/disableCause', function(req, res){
        causes.disableCause(req, res);
    })

    app.post('/enableCause', function(req, res) {
        causes.enableCause(req, res);
    })

    app.post('/addCause', function(req, res) {
        causes.addCause(req, res);
    })

    app.get('/getAllGuests', function(req, res) {
        guests.getAllGuests(req, res);
    })
    app.post('/delGuest', function(req, res) {
        guests.delGuest(req, res);
    })
    app.get('/getAllPendingcauses', function(req, res) {
        pendingcauses.getAllPendingcouses(req, res);
    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log('IS AUTHENTICATED BEEP BOOP');
        return next();
    }

    // if they aren't redirect them to the home page
    return res.redirect('/');
}
