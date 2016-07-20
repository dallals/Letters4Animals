var models = require('../models');

module.exports = (function(){
    return {

        getAllCauses: function(req, res) {
            // models.Cause.findAll({})
            models.sequelize.query('SELECT "Causes".id, "Causes".name, "Causes".description, "Causes".letter_body, "Causes".fixed, "Causes".enabled, "Causes".rep_level, "Causes"."createdAt", "Causes"."updatedAt", COUNT("Supports".cause_id) as "supports" FROM "Causes" LEFT JOIN "Supports" ON "cause_id" = "Causes".id GROUP BY "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(causes){
                res.json(causes);
            })
        },
        getEnabledCauses: function(req, res) {
            models.sequelize.query('SELECT "Causes".id, "Causes".name, "Causes".description, "Causes".letter_body, "Causes".fixed, "Causes".enabled, "Causes".rep_level, "Causes"."createdAt", "Causes"."updatedAt", COUNT("Supports".cause_id) as "supports" FROM "Causes" LEFT JOIN "Supports" ON "cause_id" = "Causes".id WHERE "Causes".enabled = true GROUP BY "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
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
                    letter_body: cause.letter_body,
                    rep_level: cause.rep_level,
                    enabled: cause.enabled
                }).then(function(cause) {
                    res.json({success: true, data: cause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })

                res.json();
            } else {
                console.log('Missing Cause');
            }
        },
        deleteCause: function(req, res) {
            console.log('Server Controller Delete');
            console.log(req.body.id)
            if (req.body.id) {
                console.log('IN IF')
                models.Cause.find({where: ['id = ?', req.body.id]}).then(function(cause){
                    console.log(cause);
                    // Going to need to do a lot to make sure we delete all the things a cause is attached to first
                    cause.destroy().then(function() {
                        res.json();
                    })
                })
            }
        }

    }//closes return
})();
