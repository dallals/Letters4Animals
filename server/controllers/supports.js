var models = require('../models');

module.exports = (function(){

	return {

		// getAllPendingcauses: function(req, res) {
  //           // models.Cause.findAll({})
  //           models.sequelize.query('SELECT "Pendingcauses".*, "Users".first_name, "Users".last_name, "Users".city, "Users".state, "Users".zipcode, "Users".email FROM "Pendingcauses" LEFT JOIN "Users" ON "Users".id = "Pendingcauses".user_id GROUP BY "Pendingcauses".id;', { type: models.sequelize.QueryTypes.SELECT})
  //           .then(function(pendingcauses){
  //               res.json(pendingcauses);
  //           })
  //       },
        addSupport: function(req, res) {
            if (req.body.support) {
                models.Support.create(
               		req.body.support
                ).then(function(support) {
                    res.json({success: true, data: support.dataValues})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })
            } else {
                console.log('Missing Support');
            }
        }


	} // closes return

})();