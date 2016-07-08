// This page is using Nodemailer for the contact form
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

module.exports = (function(){
    return {
        // Contact Emailer uses nodemailer
        contactMail: function(req, res){
            transporter.sendMail({
                from: req.body.email,
                to: 'info@letters4animals.com',
                subject: 'Contact Us - letters4animals',
                html: '<b>Message from</b> '+req.body.name+'<br><b>Message: </b>'+req.body.message+'<br>',
                text: req.body.message
            });
            transporter.close();
            res.json({ email_sent: 'success'});
        }
    }
})();
