//
var users = require('../controllers/users.js');
var contact = require('../controllers/contactMailer.js');
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

}
