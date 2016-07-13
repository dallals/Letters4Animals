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

    // app.get('/testLogin', function(req, res){
    //     console.log('=========req.user in /testLogin=========');
    //     console.log(req.user);
    //     console.log('=========req.user in /testLogin=========');
    // })
    // app.get('/testLogin2', function(req, res){
    //     console.log('=========req.user in /testLogin2=========');
    //     console.log(req.user);
    //     console.log('=========req.user in /testLogin2=========');
    // })

    // Passport testing
    // app.post('/login', passport.authenticate('local-login'), function(req, res){
    //     console.log('logged in successfull');
    //     users.login(req, res);
    // });

    // app.post('/login', function(req, res){
    //     passport.authenticate('local-login')(req, res);
    // });

    // app.post('/login', passport.authenticate('local-login', {
    //     successRedirect : '/testLogin', // redirect to the secure profile section
    //     failureRedirect : '/testLogin2', // redirect back to the signup page if there is an error
    //     failureFlash : true // allow flash messages
    // }));

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
                res.status(200).json({
                    status: 'Login successful!'
                });
            });
        })(req, res, next);
    });

    // app.post('/login', function(req, res, next) {
    //     passport.authenticate('local-login', function(err, user, info) {
    //         if (err) {
    //             return next(err); // will generate a 500 error
    //         }
    //         // Generate a JSON response reflecting authentication status
    //         if (! user) {
    //             return res.send({ success : false, message : 'authentication failed' });
    //         }
    //         // else{
    //             users.login(req, res);
    //         // }
    //     })(req, res, next);
    // });


};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
