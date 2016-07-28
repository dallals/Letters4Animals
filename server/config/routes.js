//
var users       = require('../controllers/users.js'),
    causes      = require('../controllers/causes.js'),
    supports    = require('../controllers/supports.js'),
    reps        = require('../controllers/representatives.js'),
    contact     = require('../controllers/contactMailer.js'),
    addrConf    = require('../controllers/addressConfirmation.js'),
    passport    = require("passport");
    guests      = require('../controllers/guests.js'),
    pendingcauses = require('../controllers/pendingcauses.js'),
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
    app.post('/getUserByEmail', function(req, res) {
        users.getUserByEmail(req, res);
    })
    app.post('/getUserByResetUrl', function(req, res) {
        users.getUserByResetUrl(req, res);
    })
    app.post('/resetPassword', function(req, res) {
        users.resetPassword(req, res);
    })
    app.post('/changePassword', function(req, res) {
        users.changePassword(req, res);
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
    app.get('/getSingleCause/:id', function(req, res) {
        causes.showCauseInfo(req, res);
    })
    //Single Cause for Admin Panel View Page
    app.get('/getSingleViewCause/:id', function(req, res) {
        causes.getSingleCause(req, res);
    })
    app.get('/getSupporters/:id', function(req, res) {
        causes.showCauseUsers(req, res);
    })
    app.get('/getGuests/:id', function(req, res) {
        causes.showCauseGuests(req, res);
    })
    app.get('/getCauseUsers/:id', function(req, res) {
        users.getCauseUsers(req, res);
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
    //for a user donating a letter
    app.post('/volunteerCause', function(req, res) {
        pendingcauses.addPendingCause(req, res);
    })
    app.post('/deleteCause', function(req, res) {
        causes.deleteCause(req, res);
    })
    //is this extra? Double check if we need both this and deleteCause above
    app.post('/delCause', function(req,res){
        causes.delCause(req, res);
    })
    app.post('/deletePendCause', function(req,res){
        pendingcauses.deletePendCause(req, res);
    })
    app.get('/getAllPendingcauses', function(req, res) {
        pendingcauses.getAllPendingcauses(req, res);
    })
    app.get('/pendingCause/:id', function(req, res) {
        pendingcauses.getPendingCause(req, res);
    })
    app.post('/updateCause', function(req, res){
        causes.update(req, res);
    })

    //Supports

    app.post('/addSupport', function(req, res) {
        supports.addSupport(req, res);
    })

    //guests
    app.post('/addGuest', function(req, res) {
        guests.addGuest(req, res);
    })

    app.get('/getAllGuests', function(req, res) {
        guests.getAllGuests(req, res);
    })
    app.post('/delGuest', function(req, res) {
        guests.delGuest(req, res);
    })
    app.post('/sendText', function(req,res){
        users.sendText(req,res);
    })

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated()){
        console.log('IS AUTHENTICATED BEEP BOOP');
        console.log(req.user);
        return next();
    }

    // if they aren't redirect them to the home page
    return res.redirect('/');
}
