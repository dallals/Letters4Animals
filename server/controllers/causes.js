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

        delCause: function(req, res) {
            console.log('in delCause');
            // Find and delete cause
            models.Cause.find({where: ['id = ?', req.body.id]}).then(function(cause){
                // Going to need to do a lot to make sure we delete all the things a cause is attached to first
                models.Cause.findAll({}).then(function(causes){
                    res.json(causes);
                })
            })
        }

    }//closes return
})();
