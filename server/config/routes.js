//
var users       = require('../controllers/users.js'),
    contact     = require('../controllers/contactMailer.js'),
    addrConf    = require('../controllers/addressConfirmation.js'),
    reps        = require('../controllers/representatives.js'),
    passport    = require("passport");
//
module.exports = function(app){

    //user queries for getting one user
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
    app.post('/login', function(req, res, next) {
        passport.authenticate('local-login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function(err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
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
