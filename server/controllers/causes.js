var models = require('../models');

// var user = require('../models/user.js');



module.exports = (function(){
  return {
        
        create: function(req, res) {
            // console.log(req.body)

            models.Pendinguser.create({
                name: req.body.causename,
                description: req.body.description,
                letter_body: req.body.string,
                rep_level: req.body.rep_level,
                
            }).then(function(user) {
            //Does this after creating
                // console.log(user);
                res.json({success: true, errors: null});
            }).catch(function(err) {
            //Catches Errors
                // console.log(err);
                res.json({success: false, errors: err});
            })
        },
        login: function(req, res) {
            console.log(req.body);
            //IF THERE'S ERRORS. CHANGE IF (FALSE) TO IF THERE ARE ERRORS
            if (false) {
                res.json({errors: 'error'})
            } else {
                res.json({success: 'ok'})
            }
        },

        //Grabbing a single user's info by ID
        getUserInfo: function(req, res) {
            models.User.find({where: ["id = ?", req.body.userid]}).then(function(data){
                if(data){
                    res.json(data.dataValues);
                }
                else {
                    res.send('User Not Found');
                }
            })
        },

        //Update user info
        updateUser: function(req, res) {
            // Pass req.body object to the update function to update appropriate fields
            models.User.update(req.body, { where: { id: req.body.userid } })
        },

        read: function(req, res){
            // models.user.find({}, function(err, data){
                console.log("dfsdfsdf")
                // console.log(models)
            models.User.findAll({}).then(function(data){
                // if(err){
                //     console.log(err)
                // }
                // else{
                    console.log(data)
                    res.json(data)
                // }
            })
        }

  }//closes return
})();