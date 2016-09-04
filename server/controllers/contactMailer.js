// This page is using Nodemailer for the contact form
var models = require('../models');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

module.exports = (function(){
    return {
        // Contact Emailer uses nodemailer
        contactMail: function(req, res){
            transporter.sendMail({
                from: req.body.email,
                to: 'info@letters4animals.org',
                subject: 'Contact Us - letters4animals',
                html: '<b>Message from</b> '+req.body.name+'<br><b>Message: </b>'+req.body.message+'<br>',
                text: req.body.message
            });
            transporter.close();
            res.json({ email_sent: 'success'});
        },

        // User registration email confirmation
        confEmail: function(req, res) {

            var confURL = "http://letters4animals.org/confirmEmail/" + req.body.rand_url;

            transporter.sendMail({
                from: { name: 'Letters4Animals', address: 'info@letters4animals.org' },
                to: req.body.email,
                subject: 'Letters4Animals Registration Confirmation',
                html: '<div style="background:black;width:500px;margin:0px auto;margin-top:10px;margin-bottom:40px;padding:40px;font-style:tahoma"><h1 style="color:white;text-align:center;margin-top:10px">Hello '+req.body.first_name+' '+req.body.last_name+'!<br></h1><p style="text-align:center;color:white;font-size:15px">Please confirm your email address for Letters4Animals<br>by using the button below.<br><br>Thank You!</p><br><a style="text-decoration:none;margin-left:36%;background:rgb(25, 176, 153);padding:20px;width:200px;border:none;color:white;font-style:bold;font-size:20px" href='+confURL+'>CONFIRM</a></div><p>If the button above does not work, please use this link: <a href="'+confURL+'">'+confURL+'</a></p>',
                text: 'http://letters4animals.org/confirmEmail/'+req.body.rand_url
            });
            transporter.close();
            res.json({ email_sent: 'success'});
        },
        // Send Email notification for a cause
        emailNotification: function(req, res){
            models.User.find({where: ["email_notification = ?", true]})
            .then(function(users){
                console.log('Found users');
            })
            res.json({ email_sent: 'success'});
        },

    }   // End of return
})();
