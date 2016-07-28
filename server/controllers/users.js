var models = require('../models');
var Sequelize = require('sequelize');
//For sending reset email
var transporter = require('nodemailer').createTransport();
var twilio = require('twilio')('AC774792db902431a6b6a506101c53c5ce','bb5f76ea5ce05b65fbada13aaff01ef8');


var genLength      = 50;

var emailConfGen = function(i, gen) {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    if (i===undefined)   {i = 0;}   else {i++;}
    if (gen===undefined) {gen = ''} else {gen += valid[Math.floor(Math.random()*valid.length)]}
    if (i<genLength)     {return emailConfGen(i, gen)} else { return gen; }
}
var resetPassGen = function() {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    var gen = '';

    for (var i = 0; i < genLength; i++) {
        gen += valid[Math.floor(Math.random()*valid.length)];
    }
    return gen;
}

var sendResetEmail = function(url, email) {
    transporter.sendMail({
        from: 'info@letters4animals.com',
        to: email,
        subject: 'Forgotten Password - Letters4Animals',
        html:   '<div style="background: black;width:500px;margin:0px auto;margin-top:10px;margin-bottom:40px;padding:40px;font-style:tahoma"><p style="text-align:center;color:white;font-size:15px">To reset your password, please click on the button below, or click the following link if the button does not work.</p><br><br>'+
                '<a style="text-decoration:none;margin-left:36%;background:rgb(25, 176, 153);padding:20px;width:200px;border:none;color:white;font-style:bold;font-size:20px" href="http://localhost:8000/#/resetPassword/'+url+'">Reset Password</a></div><br>'+
                'http://localhost:8000/#/resetPassword/'+
                url,
        text: 'something'
    }, function(error, response) {
        if (error) {
            console.log(error);
        }
    });
    transporter.close();
}

var checkExistingUrl = function(email, user) {
    var url = resetPassGen();
    models.User.find({attributes: ["id", "first_name", "last_name", "email", "street_address", "city", "state", "zipcode", "phone_number", "phone_notification", "email_notification", "volunteer", "admin", "login_count",
"reset_pw_url", "reset_pw_url_created_at", "createdAt", "updatedAt"], where: ["reset_pw_url = ?", url]}).then(function(data) {
        if (data) {
            checkExistingUrl(email, user);
        } else {
            sendResetEmail(url, email);
            console.log('Sent reset Url to',email,'url is',url);

            var today = new Date();
            user.update({reset_pw_url: url, reset_pw_url_created_at: today}).catch(function(err) {
                console.log(err);
            });
        }
    }).catch(function(err) {
        console.log(err);
    });
}


module.exports = (function(){
  return {

        confirmEmail: function(req, res) {

            models.Pendinguser.find({where: ["verify_url = ?", req.params.link]}).then(function(user){
                console.log('in confirmEmail');
                if(user){
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

        //for /users/show/:id type route
        showUserInfo: function (req, res) {
            models.User.find({attributes: ["id", "first_name", "last_name", "email", "street_address", "city", "state", "zipcode", "phone_number", "phone_notification", "email_notification", "volunteer", "admin", "login_count",
        "reset_pw_url", "reset_pw_url_created_at", "createdAt", "updatedAt"], where: ["id = ?", req.params.id]}).then(function(data){
                if(data){
                    res.json(data.dataValues);
                }
                else {
                    res.send('User Not Found');
                }
            })
        },

        //for /users/:id type route
        //show all the causes a single user supported, and how many times they supported it
        showUserCauses: function (req, res){
            models.sequelize.query('SELECT "Causes".id, "Causes".name, COUNT("Supports".cause_id) as "supports" FROM "Supports" LEFT JOIN "Causes" ON "cause_id" = "Causes".id WHERE "Supports".user_id = ? GROUP BY "Causes".id;', { replacements: [req.params.id], type: models.sequelize.QueryTypes.SELECT})
            .then(function(causesSupported){
                res.json(causesSupported);
            })
        },

        //Grabbing a single user's info by SESSION ID
        getUserInfo: function(req, res) {
            models.User.find({attributes: ["id", "first_name", "last_name", "email", "street_address", "city", "state", "zipcode", "phone_number", "phone_notification", "email_notification", "volunteer", "admin", "login_count",
        "reset_pw_url", "reset_pw_url_created_at", "createdAt", "updatedAt"], where: ["id = ?", req.body.userid]}).then(function(data){
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
            models.User.find({attributes: ["id", "first_name", "last_name", "email", "street_address", "city", "state", "zipcode", "phone_number", "phone_notification", "email_notification", "volunteer", "admin", "login_count",
        "reset_pw_url", "reset_pw_url_created_at", "createdAt", "updatedAt"], where: ["email = ?", req.body.email]}).then(function(data) {
                if (data) {
                    // res.json({data: data.dataValues});

                    checkExistingUrl(data.dataValues.email, data);
                } else {
                    res.json({errors: 'Email not found'});
                }
            })
        },
        getUserByResetUrl: function(req, res) {
            models.User.find({attributes: ["id", "first_name", "last_name", "email", "street_address", "city", "state", "zipcode", "phone_number", "phone_notification", "email_notification", "volunteer", "admin", "login_count",
        "reset_pw_url", "reset_pw_url_created_at", "createdAt", "updatedAt"], where: ["reset_pw_url = ?", req.body.resetUrl]}).then(function(data) {
                if (data) {
                    res.json({data: data.dataValues});
                } else {
                    res.json({errors: 'Url not found'});
                }
            })
        },
        resetPassword: function(req, res) {
            models.User.find({where: ["reset_pw_url = ?", req.body.resetUrl]}).then(function(data) {
                var password = models.Pendinguser.generateHash(req.body.password);
                if (data) {
                    data.update({password: password, reset_pw_url: null, reset_pw_url_created_at: null});
                    data.update({reset_pw_url: null});
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
            if (req.body.userid != 1) {
                req.body.admin = false;
            }
            models.User.update(req.body, { where: { id: req.body.userid } })
        },

        changePassword: function(req, res) {
            // Pass req.body object to the update function to update appropriate fields
            models.User.find({where: ["id = ?", req.body.userid]}).then(function(user){
                if(user){
                    if (user.validPassword(req.body.oldPassword)){
                        if (req.body.newPassword === req.body.confPassword) {
                            newPass = models.User.generateHash(req.body.newPassword);
                            user.update({password: newPass});
                            res.json({success: true, statusMessage:'Password Changed'});
                        }
                        else {
                            res.json({success: false, statusMessage:'Passwords Do Not Match'});
                        }
                    }
                    else {
                        res.json({success: false, statusMessage:'Bad Password'});
                    }
                }
                else {
                    res.json({success: false, statusMessage:'User Not Found'});
                }
            })
        },

        getAllUsers: function(req, res){
            models.sequelize.query('SELECT "Users".*, COUNT("Supports".user_id) as "supports" FROM "Users" LEFT JOIN "Supports" ON "user_id" = "Users".id GROUP BY "Users".id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(users){
                res.json(users);
            })
        },

        //Commented out because duplicate. connects to singleCauseController ln31. causeFactory ln 49.
        getCauseUsers: function (req,res){
          var id = req.params.id;
            models.sequelize.query('SELECT "Users".* FROM "Users" LEFT JOIN "Supports" ON "Supports".user_id = "Users".id WHERE "Supports".cause_id = ?;', { replacements: [id],type: models.sequelize.QueryTypes.SELECT})
            .then(function(users){
                res.json(users);
            })
        },

        delUser: function(req, res){
            var self = this;
            // Find user, find and delete user's supports, then delete user
            models.User.find({where: ['id = ?', req.body.id]})
            .then(function(user){
                models.Support.destroy({where: ['user_id = ?', req.body.id]})
                models.Pendingcause.destroy({where: ['user_id = ?', req.body.id]})
                .then(function(supports){
                    user.destroy()
                    .then(function(){
                    // Send back all remaining users
                        self.getAllUsers(req, res)
                    })
                })
            })
        },

        sendText: function(req,res){
            var cause = req.body;
            models.User.findAll({attributes: ['phone_number', 'first_name'], where: ["phone_notification = ?", true]})
            .then(function(data){
                if(data){
                    for(var user of data){
                        if(user.dataValues.phone_number){
                            twilio.sendMessage({
                            to:   "+1"+user.dataValues.phone_number,
                            from: +13232388340,
                            body: "Hello " + user.dataValues.first_name + "." + "\n" +
                                  cause.text_blurb + "\n"+
                                  "http://letters4animals.org/#/writealetter/cause/" + cause.id

                            }, function(err,data){
                                if(err){
                                    console.log("Something went wrong with twilio.", err);
                                } else {
                                    console.log('Text notification sent.');
                                }
                            });
                        }
                    }
                }
                else{
                    console.log("Error finding all users for phone notifications.");
                }
            })
        }

  }//closes return
})();
