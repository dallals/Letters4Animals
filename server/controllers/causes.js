var models = require('../models');
var twilio = require('twilio')('AC774792db902431a6b6a506101c53c5ce','bb5f76ea5ce05b65fbada13aaff01ef8');
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport();
var pdf = require('html-pdf');
var fs = require('fs');

module.exports = (function(){
    return {

        getAllCauses: function(req, res) {
            models.sequelize.query('SELECT "Causes".*, "Guests".cause_id as "guests_causes", COUNT("Supports".cause_id) as "supports", COUNT("Guests".cause_id) as "guests" FROM "Causes" LEFT JOIN "Supports" ON "Supports"."cause_id" = "Causes".id LEFT JOIN "Guests" ON "Guests"."cause_id" = "Causes".id GROUP BY "Causes".id, "Guests".cause_id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(causes){
                res.json(causes);
            })
        },

        //for /users/show/:id type route
        showCauseInfo: function (req, res) {
            models.Cause.find({where: ["id = ?", req.params.id]}).then(function(data){
                if(data){
                    res.json(data.dataValues);
                }
                else {
                    res.send('Cause Not Found');
                }
            })
        },

        //for /causes/show/:id type route
        //show all the users that have supported a single, and how many times they supported it
        showCauseUsers: function (req, res){
            models.sequelize.query('SELECT "Users".id, "Users".first_name, "Users".email, "Users".last_name, "Users".city, "Users".state, COUNT("Supports".user_id) as "supports" FROM "Supports" LEFT JOIN "Users" ON "user_id" = "Users".id WHERE "Supports".cause_id = ? GROUP BY "Users".id;', { replacements: [req.params.id], type: models.sequelize.QueryTypes.SELECT})
            .then(function(supporters){
                res.json(supporters);
            })
        },

        showCauseGuests: function (req, res){
            models.sequelize.query('SELECT "Guests".* FROM "Guests" WHERE "Guests".cause_id = ? GROUP BY "Guests".id;', { replacements: [req.params.id], type: models.sequelize.QueryTypes.SELECT})
            .then(function(guests){
                res.json(guests);
            })
        },

        getSingleCause: function(req,res){
            var id = req.params.id;
            models.sequelize.query('SELECT "Causes".name, "Causes".description, "Causes".letter_body FROM "Causes" WHERE "Causes".id = ?;', { replacements: [id],type: models.sequelize.QueryTypes.SELECT})
            .then(function(cause){
                res.json(cause);
            })
        },

        getEnabledCauses: function(req, res) {
            models.Cause.findAll({where: ['enabled = ?', true]})
            .then(function(causes){
                res.json(causes);
            })
        },

        disableCause: function(req, res) {
            // Find and delete cause
            models.Cause.find({where: ['id = ?', req.body.id]}).then(function(cause){
                // Going to need to do a lot to make sure we delete all the things a cause is attached to first
                cause.update({enabled: false});
                res.json();
            })
        },
        enableCause: function(req, res) {
            models.Cause.find({where: ['id = ?', req.body.id]}).then(function(cause){
                // Going to need to do a lot to make sure we delete all the things a cause is attached to first
                cause.update({enabled: true});
                res.json();
            })
        },

        addCause: function(req, res) {
            var self = this;
            if (req.body) {
                var cause = req.body;
                models.Cause.create({
                    name: cause.name,
                    description: cause.description,
                    rep_level: cause.rep_level,
                    enabled: cause.enabled,
                    fixed: cause.fixed,
                    text_blurb: cause.text_content,
                    email_blurb: cause.email_content,
                    fixed_name: cause.fixed_name,
                    fixed_address: cause.fixed_address,
                    fixed_city: cause.fixed_city,
                    fixed_state: cause.fixed_state,
                    fixed_zipcode: cause.fixed_zipcode,
                    letter_body: cause.letter_body,
                    letter_footnote: cause.letter_footnote
                }).then(function(cause) {
                    // If cause is enabled, send out notifications
                    if(cause.enabled){
                        self.sendNotifications(cause);
                    }
                    res.json({success: true, data: cause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })

            } else {
                console.log('Missing Cause');
            }
        },

        convertPendingCause: function(req, res) {
            if (req.body.cause) {
                var cause = req.body.cause;
                models.Cause.create({
                    name: cause.name,
                    description: cause.description,
                    rep_level: cause.rep_level,
                    letter_body: cause.letter_body,
                    letter_footnote: cause.letter_footnote,
                    enabled: cause.enabled,
                    fixed: cause.fixed,
                    fixed_name: cause.fixed_name,
                    fixed_address: cause.fixed_address,
                    fixed_city: cause.fixed_city,
                    fixed_state: cause.fixed_state,
                    fixed_zipcode: cause.fixed_zipcode
                }).then(function(cause) {
                    //need to delete pending cause
                    models.Pendingcause.destroy({where: ['id = ?', req.body.pendingcause_id]})
                    res.json({success: true, data: cause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })
            } else {
                console.log('Missing Cause');
            }
        },

        delCause: function(req, res){
            var self = this;
            // Find user, find and delete user's supports, then delete user
            models.Cause.find({where: ['id = ?', req.body.id]})
            .then(function(cause){
                models.Support.destroy({where: ['cause_id = ?', req.body.id]})
                models.Guest.destroy({where: ['cause_id = ?', req.body.id]})
                .then(function(supports){
                    cause.destroy()
                    .then(function(){
                        // Send back all remaining users
                        self.getAllCauses(req, res)
                    })
                })
            })
        },

        update: function(req, res) {
            if (req.body) {
                var cause = req.body;
                models.Cause.find({where: ['id = ?', req.body.id]})
                .then(function(foundcause){
                foundcause.update({
                    name: cause.name,
                    description: cause.description,
                    rep_level: cause.rep_level,
                    letter_body: cause.letter_body,
                    letter_footnote: cause.letter_footnote,
                    text_blurb: cause.text_blurb,
                    email_blurb: cause.email_blurb,
                    enabled: cause.enabled,
                    fixed: cause.fixed,
                    fixed_name: cause.fixed_name,
                    fixed_address: cause.fixed_address,
                    fixed_city: cause.fixed_city,
                    fixed_state: cause.fixed_state,
                    fixed_zipcode: cause.fixed_zipcode
                }).then(function(updatedcause) {
                    res.json({success: true, data: updatedcause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })
            })

            } else {
                console.log('Missing Cause');
            }
        },

        sendNotifications: function(cause) {
            // Send text notification
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
                                  "http://letters4animals.org/#/writealetter/cause/" + cause.dataValues.id

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
            })  // End of text alert

            // Email notification
            models.User.findAll({attributes: ['email', 'first_name'], where: ["phone_notification = ?", true]})
            .then(function(data){
                if(data){
                    for(var user of data){
                        transporter.sendMail({
                            from: 'info@letters4animals.org',
                            to: user.dataValues.email,
                            subject: 'Letters4Animals.org - New cause has been created!',
                            // html: cause.dataValues.email_blurb,
                            html: '<div style="background:black;width:500px;margin:0px auto;margin-top:10px;margin-bottom:40px;padding:40px;font-style:tahoma"><p style="text-align:center;color:white;font-size:15px">'+cause.dataValues.email_blurb+'</p><br><a style="text-decoration:none;margin-left:36%;background:rgb(25, 176, 153);padding:20px;width:200px;border:none;color:white;font-style:bold;font-size:20px" href="http://letters4animals.org/#/writealetter/cause'+cause.dataValues.id+'">Write letter</a></div><p>If the button above does not work, please use this link: <a href="http://letters4animals.org/#/writealetter/cause/'+cause.dataValues.id+'">'+'http://letters4animals.org/#/writealetter/cause/'+cause.dataValues.id+'</a></p>',
                            text: cause.dataValues.email_blurb
                        });
                        transporter.close();
                    }
                }
                else{
                    console.log("Error finding all users for email notifications.");
                }
            })  // End of email notif.

        },   // End of sendNotifs

        saveLetters: function(req, res){

            var html = req.body.letter;
            var config = {
                height: "11in",        // allowed units: mm, cm, in, px
                width: "8.5in",
                format: "Letter",
                border: {
                    top: "1in",            // default is 0, units: mm, cm, in, px
                    right: ".5in",
                    bottom: "1in",
                    left: ".5in"
                }
            };
	    // Creates a pdf file and saves it in Node's buffer
            pdf.create(html, config).toBuffer(function(err, buffer){
		// Converts saved pdf file into a base64 string so pass back to client
                var baseBuff = buffer.toString('base64');
                res.json(baseBuff);
            });
        }

    }//closes return
})();
