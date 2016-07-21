var models = require('../models');
var Sequelize = require('sequelize');
//For sending reset email
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();

var emailConfLinks = [],
    genLength      = 50;

var emailConfGen = function(i, gen) {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    if (i===undefined)   {i = 0;}   else {i++;}
    if (gen===undefined) {gen = ''} else {gen += valid[Math.floor(Math.random()*valid.length)]}
    if (i<genLength)     {return emailConfGen(i, gen)} else {emailConfLinks.push(gen); return gen;}
}
var resetPassGen = function() {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var gen = '';

    for (var i = 0; i < genLength; i++) {
        gen += valid[Math.floor(Math.random()*valid.length)];
    }
    return gen;
}

var sendResetEmail = function(email) {
    transporter.sendMail({
        from: 'info@letters4animals.com',
        to: 'howard.yunghao.jiang@gmail.com',
        subject: 'Forgotten Password - letters4animals',
        html: resetPassGen()+'<br>'+email,
        text: 'something'
    });
    transporter.close();
}

module.exports = (function(){
  return {

        confirmEmail: function(req, res) {

            models.Pendinguser.find({where: ["verify_url = ?", req.params.link]}).then(function(user){
                console.log('in confirmEmail');
                if(user){
                    console.log(user.dataValues);
                    founduser = user.dataValues
                    deleteid = founduser.id
                    founduser.id = null;
                    models.User.create(founduser).then(function(createdUser) {
                        //Does this after creating
                        founduser.id = deleteid;
                        user.destroy();
                        res.redirect('/#/accountactivation');
                    }).catch(function(err) {
                    //Catches Errors
                        res.json({success: false, errors: err});
                    })
                }
                else {
                    res.redirect('/#/activationerror');
                }
            })
        },
        create: function(req, res) {

            models.User.find({where: ["email = ?", req.body.email]}).then(function(founduser){
                if(founduser){
                    res.json({success: false, errors:'User with that email already exists'});
                }
                else {
                    var hashPass = models.Pendinguser.generateHash(req.body.password);
                    var randString = emailConfGen(20);
                    models.Pendinguser.create({
                        first_name: req.body.firstName,
                        last_name: req.body.lastName,
                        email: req.body.email,
                        password: hashPass,
                        street_address: req.body.address,
                        city: req.body.city,
                        state: req.body.state,
                        zipcode: req.body.zip,
                        phone_number: req.body.phoneNumber,
                        volunteer: req.body.volunteer,
                        email_notification: req.body.emailalert,
                        phone_notification: req.body.textalert,
                        admin: false,
                        verify_url: randString
                    }).then(function(user) {
                    //Does this after creating
                        res.json({success: true, errors: null, string: randString});
                    }).catch(function(err) {
                        //Catches Errors
                        res.json({success: false, errors: err});
                    })
                }
            })
        },

        //Grabbing a single user's info by ID
        getUserInfo: function(req, res) {
            models.User.find({where: ["id = ?", req.body.userid]}).then(function(data){
                console.log('in user info');
                if(data){
                    res.json(data.dataValues);
                }
                else {
                    res.send('User Not Found');
                }
            })
        },
        //For Reset
        getUserByEmail: function(req, res) {
            models.User.find({where: ["email = ?", req.body.email]}).then(function(data) {
                console.log('Server Controller Sequelize');
                if (data) {
                    res.json({data: data.dataValues});
                    console.log(data.dataValues.email);
                    sendResetEmail(data.dataValues.email);
                    data.update({reset_url: resetPassGen()});
                    console.log('Sent');
                } else {
                    res.json({errors: 'Email not found'});
                }
            })
        },
        getUserByResetUrl: function(req, res) {
            models.User.find({where: ["reset_url = ?", req.body.resetUrl]}).then(function(data) {
                if (data) {
                    res.json({data: data.dataValues});
                    console.log(data.dataValues);
                } else {
                    res.json({errors: 'Url not found'});
                }
            })
        },
        resetPasswordForUser: function(req, res) {
            models.User.find({where: ["reset_url = ?", req.body.resetUrl]}).then(function(data) {
                var password = models.Pendinguser.generateHash(req.body.password);;
                if (data) {
                    data.update({password: password})
                    res.json({success: true, statusMessage: 'Password successfully updated'});
                    //update the user
                } else {
                    res.json({success: false, statusMessage: 'User not found'})
                }
            })
        },

        //Update user info
        updateUser: function(req, res) {
            // Pass req.body object to the update function to update appropriate fields
            req.body.admin = false;
            models.User.update(req.body, { where: { id: req.body.userid } })
        },

        getAllUsers: function(req, res){
            console.log("in getAllUsers");
            models.sequelize.query('SELECT "Users".id, "Users".email, "Users".login_count, "Users".phone_notification, "Users".email_notification, "Users".first_name, "Users".last_name, "Users".state, "Users".street_address, COUNT("Supports".user_id) as "supports" FROM "Users" LEFT JOIN "Supports" ON "user_id" = "Users".id GROUP BY "Users".id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(users){
                // console.log(users);
                res.json(users);
            })
        },

        delUser: function(req, res){
            var self = this;
            // console.log(self);
            console.log('in delUser');
            // Find user, find and delete user's supports, then delete user
            models.User.find({where: ['id = ?', req.body.id]})
            .then(function(user){
                models.Support.destroy({where: ['user_id = ?', req.body.id]})
                .then(function(destroyed){
                    user.destroy()
                    .then(function(){
                        // Send back all remaining users
                        self.getAllUsers(req, res)
                    })
                })
            })
        }

  }//closes return
})();
