var models = require('../models');

module.exports = (function(){

	return {

		getAllPendingcauses: function(req, res) {
            // models.Cause.findAll({})
            models.sequelize.query('SELECT "Pendingcauses".id, "Pendingcauses".name, "Pendingcauses".description, "Pendingcauses".letter_body, "Pendingcauses".fixed, "Pendingcauses".enabled, "Pendingcauses".rep_level, "Pendingcauses"."createdAt", "Pendingcauses"."updatedAt", COUNT("Supports".cause_id) as "supports" FROM "Pendingcauses" LEFT JOIN "Supports" ON "cause_id" = "Pendingcauses".id GROUP BY "Pendingcauses".id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(pendingcauses){
                res.json(pendingcauses);
            })
    },

		getPendingCause: function(req,res){
				console.log("made it to model",req.params.id);
				var id = req.params.id;
				models.sequelize.query('SELECT "Pendingcauses".id, "Pendingcauses".name, "Pendingcauses".description, "Pendingcauses".letter_body, "Pendingcauses".fixed, "Pendingcauses".enabled, "Pendingcauses".rep_level, "Pendingcauses"."createdAt", "Pendingcauses"."updatedAt" FROM "Pendingcauses" WHERE "Pendingcauses".id = ?;', { replacements: [id],type: models.sequelize.QueryTypes.SELECT})
				.then(function(pendingcauses){
						res.json(pendingcauses);
				})
		}

	} // closes return

})();
