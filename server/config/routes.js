//
var users       = require('../controllers/users.js'),
    contact     = require('../controllers/contactMailer.js'),
    addrConf    = require('../controllers/addressConfirmation.js'),
    reps        = require('../controllers/representatives.js'),
    passport    = require("passport");
//
module.exports = function(app){

    //user queries for getting one user
    // app.get('/user', function(req, res){    // Maybe not needed
    //     users.create(req, res);
    // })
    app.get('/confirmEmail/:link', function(req, res) {
        users.confirmEmail(req, res);
    })
    app.get('/generate', function(req, res) {
        users.generate(req, res);
    })



    //Register New User
    app.post('/users', function(req,res){
        users.create(req, res);
    })
    // app.post('/login', function(req, res) {
    //     users.login(req, res);
    // })

    // contact us
    app.post('/contact', function(req,res){
        contact.contactMail(req, res);
    })

    //For Address Finding
    app.post('/addressConfirmation', function(req, res) {
        addrConf.confirmAddr(req, res);
    })
    //For Representative Finding
    app.post('/representatives/:user', function(req, res) {
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

    app.get('/readUsers', function(req, res) {
        users.read(req, res);
    })


    // Passport testing
    app.post('/login', passport.authenticate('local-login'), function(req, res){
        users.login(req, res);
    });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
