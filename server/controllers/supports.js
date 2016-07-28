var models = require('../models');

module.exports = (function(){

	return {

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
