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

      delCause: function(req, res){
        models.Cause.destroy({where: ['id = ?', req.body.id]})
          .then(function(cause){
            models.sequelize.query('SELECT "Causes".*, COUNT("Supports".cause_id) as "supports" FROM "Causes" LEFT JOIN "Supports" ON "cause_id" = "Causes".id GROUP BY "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(causes){
                res.json(causes);
            }).catch(function(err){
              console.log(err)
            })
          })
        
      },

    }//closes return
})();
