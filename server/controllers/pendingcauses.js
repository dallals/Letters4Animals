var models = require('../models');

module.exports = (function(){

	return {

		getAllPendingcauses: function(req, res) {
            // models.Cause.findAll({})
						models.sequelize.query('SELECT "Pendingcauses".*, "Users".* FROM "Pendingcauses" LEFT JOIN "Users" ON "Users".id = "Pendingcauses".user_id;', { type: models.sequelize.QueryTypes.SELECT})
            .then(function(pendingcauses){
                res.json(pendingcauses);
            })
        },
        addPendingCause: function(req, res) {
            if (req.body.pendingcause) {
                var pendingcause = req.body.pendingcause;
                models.Pendingcause.create({
                    name: pendingcause.name,
                    description: pendingcause.description,
                    user_id: pendingcause.user_id,
                    rep_level: pendingcause.rep_level,
                    letter_body: pendingcause.letter_body,
                    letter_footnote: pendingcause.letter_footnote,
                    enabled: false,
                    fixed: pendingcause.fixed,
                    fixed_name: pendingcause.fixed_name,
                    fixed_address: pendingcause.fixed_address,
                    fixed_city: pendingcause.fixed_city,
                    fixed_state: pendingcause.fixed_state,
                    fixed_zipcode: pendingcause.fixed_zipcode
                }).then(function(pendingcause) {
                    res.json({success: true, data: pendingcause})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })

                res.json(); //needed?
            } else {
                console.log('Missing Pendingcause');
            }
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
