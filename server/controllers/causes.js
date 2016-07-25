var models = require('../models');

module.exports = (function(){
    return {

        getAllCauses: function(req, res) {
            // models.Cause.findAll({})
            // models.sequelize.query('SELECT "Causes".id, "Causes".name, "Causes".description, "Causes".letter_body, "Causes".fixed, "Causes".enabled, "Causes".rep_level, "Causes"."createdAt", "Causes"."updatedAt", COUNT("Supports".cause_id) as "supports" FROM "Causes" LEFT JOIN "Supports" ON "cause_id" = "Causes".id WHERE "Causes".enabled = true GROUP BY "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
            models.sequelize.query('SELECT "Causes".*, COUNT("Supports".cause_id) as "supports" FROM "Causes" LEFT JOIN "Supports" ON "cause_id" = "Causes".id GROUP BY "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(causes){
                res.json(causes);
            })
        },
        //for /users/show/:id type route
        showCauseInfo: function (req, res) {
            models.Cause.find({where: ["id = ?", req.params.id]}).then(function(data){
                if(data){
                    console.log("data.dataValues");
                    console.log(data.dataValues);
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
            models.sequelize.query('SELECT "Users".*, COUNT("Supports".user_id) as "supports" FROM "Supports" LEFT JOIN "Users" ON "user_id" = "Users".id WHERE "Supports".cause_id = ? GROUP BY "Users".id;', { replacements: [req.params.id], type: models.sequelize.QueryTypes.SELECT})
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
        //     models.Guest.findAll({where: ["cause_id = ?", req.params.id]}).then(function(data){
        //         if(data){
        //             console.log("data.dataValues");
        //             console.log(data.dataValues);
        //             res.json(data.dataValues);
        //         }
        //         else {
        //             res.send('Cause Not Found');
        //         }
        //     })
        // },    

// =======
        getSingleCause: function(req,res){
            console.log("made it to model",req.params.id);
            var id = req.params.id;
            models.sequelize.query('SELECT"Causes".name, "Causes".description, "Causes".letter_body FROM "Causes" WHERE "Causes".id = ?;', { replacements: [id],type: models.sequelize.QueryTypes.SELECT})
            .then(function(cause){
                res.json(cause);
            })
        },
// >>>>>>> dd2e4451499998601b942ea81faede01bab65196

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
                    res.json({success: true, data: cause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })

                res.json(); //needed?
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
                //need ti delete pending cause
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

        deleteCause: function(req, res){
            var self = this;
            // console.log(self);
            console.log('in deleteCause');
            // Find cause, find and delete cause's supports/guests, then delete cause
            // models.Cause.find({where: ['id = ?', req.body.id]})
            // .then(function(cause){
            //     models.Support.destroy({where: ['cause_id = ?', cause.id]})
            //     .then(function(supportsDestroyed){
            //         models.Guest.destroy({where: ['cause_id = ?', cause.id]})
            //         .then(function(guestsDestroyed){
            //             cause.destroy()
            //             .then(function(){
            //                 // Send back all remaining users
            //                 self.getAllCauses(req, res)
            //         })
            //     })
            // })
            models.Cause.find({
                where: ['id = ?', req.body.id]
            }).then(function(cause){
                models.Support.destroy({where: ['cause_id = ?', cause.id]})
            }).then(function(supportsDestroyed){
                models.Guest.destroy({where: ['cause_id = ?', req.body.id]})
            }).then(function(guestsDestroyed){
                models.Cause.destroy({where: ['id = ?', req.body.id]})
            }).then(function(causeDestroyed){
                self.getAllCauses(req, res)
            })

        }

    }//closes return
})();
