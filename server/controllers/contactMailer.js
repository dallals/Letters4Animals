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
        },

        // User registration email confirmation
        confEmail: function(req, res) {
            console.log('=========confEmail req.body=========');
            console.log(req.body);
            console.log('=========confEmail req.body=========');
            transporter.sendMail({
                from: 'vdayspam@gmail.com',
                to: req.body.email,
                subject: 'Letters4Animals Registration Confirmation',
                html: '<h2>Hello '+req.body.first_name+' '+req.body.last_name+'!</h2><br><a href=http://localhost:8000/#/confirmEmail/'+req.body.rand_url+'>Confirm</a>',
                text: 'What goes here?'
            });
            transporter.close();
            res.json({ email_sent: 'success'});
        }

    }   // End of return
})();
