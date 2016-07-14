var models = require('../models');

module.exports = (function(){
    return {

        getAllCauses: function(req, res) {
            models.Cause.findAll({}).then(function(causes){
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
