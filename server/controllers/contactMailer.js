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
            var confURL = "http://localhost:8000/confirmEmail/" + req.body.rand_url;

            transporter.sendMail({
                from: 'vdayspam@gmail.com', //change this email to ????
                to: req.body.email,
                subject: 'Letters4Animals Registration Confirmation',
                html: '<div style="background:black;width:500px;margin:0px auto;margin-top:10px;margin-bottom:40px;padding:40px;font-style:tahoma"><h1 style="color:white;text-align:center;margin-top:10px">Hello '+req.body.first_name+' '+req.body.last_name+'!<br></h1><p style="text-align:center;color:white;font-size:15px">Please confirm your email address for Letters4Animals<br>by using the button below.<br><br>Thank You!</p><br><a style="text-decoration:none;margin-left:36%;background:rgb(25, 176, 153);padding:20px;width:200px;border:none;color:white;font-style:bold;font-size:20px" href='+confURL+'>CONFIRM</a></div>',
                text: 'http://localhost:8000/#/confirmEmail/'+req.body.rand_url
            });
            transporter.close();
            res.json({ email_sent: 'success'});
        }

    }   // End of return
})();
