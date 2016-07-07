//
var users       = require('../controllers/users.js'),
    contact     = require('../controllers/contactMailer.js'),
    addrConf    = require('../controllers/addressConfirmation.js'),
    reps        = require('../controllers/representatives.js');
//
module.exports = function(app){

    //user queries
    app.get('#', function(req, res){

    })

    app.post('#', function(req,res){

    })

    // contact us
    app.post('/contact', function(req,res){
        contact.contactMail(req, res);
    })

    app.post('/addressConfirmation', function(req, res) {
        console.log('Route: /addressConfirmation')
        addrConf.confirmAddr(req, res);
    })

    app.post('/representatives/:user', function(req, res) {
        reps.findReps(req, res);
    })
}
