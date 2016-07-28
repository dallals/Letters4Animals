var models = require('../models');
var twilio = require('twilio')('AC774792db902431a6b6a506101c53c5ce','bb5f76ea5ce05b65fbada13aaff01ef8');

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
            models.sequelize.query('SELECT"Causes".name, "Causes".description, "Causes".letter_body FROM "Causes" WHERE "Causes".id = ?;', { replacements: [id],type: models.sequelize.QueryTypes.SELECT})
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

                    // Send text notification
                    models.User.findAll({attributes: ['phone_number'], where: ["phone_notification = ?", true]})
                    .then(function(data){
                    	if(data){
                            console.log('=========cause inside texting=========');
                            console.log(cause);
                            console.log('=========cause inside texting=========');
                    		var phoneArray = []
                    		for (var i = 0; i < data.length; i++) {
                    			if (data[i].dataValues.phone_number.length === 10) {
                    				phoneArray.push(data[i].dataValues.phone_number);
                    			}
                    		}
                            for (var phone of phoneArray){
                                twilio.sendMessage({
                                // to:   "+1"+phone,
                                to:   "+19492927463",
                                from: +13232388340,
                                body: "Hey you." + "\n" +
                                      cause.text_blurb + "\n"+
                                      "Mail a letter and your voice will be heard."+ "\n"+
                                      "http://letters4animals.org/#/writealetter/cause/" + cause.dataValues.id

                                }, function(err,data){
                                    if(err){
                                        console.log("something went wrong with twilio", err);
                                        // res.json(err);
                                    } else {
                                        // res.send('sent twilio message successfully');
                                    }
                                });
                            }
                    	}
                    	else{
                    		console.log("error finding all users with phone notification enabled");
                    	}
                    })  // End of text alert

                    // sendEmailAlerts(cause);

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

                res.json(); //needed?
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
            console.log('getting to updated causes backend')
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
                    enabled: cause.enabled,
                    fixed: cause.fixed,
                    fixed_name: cause.fixed_name,
                    fixed_address: cause.fixed_address,
                    fixed_city: cause.fixed_city,
                    fixed_state: cause.fixed_state,
                    fixed_zipcode: cause.fixed_zipcode
                }).then(function(updatedcause) {
                    res.json({success: true, data: cause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })
            })

            } else {
                console.log('Missing Cause');
            }
        }

    }//closes return
})();
