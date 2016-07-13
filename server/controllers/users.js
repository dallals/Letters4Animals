var models = require('../models');
var emailConfLinks = [],
    genLength      = 50;
// var user = require('../models/user.js');


var emailConfGen = function(i, gen) {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    if (i===undefined)   {i = 0;}   else {i++;}
    if (gen===undefined) {gen = ''} else {gen += valid[Math.floor(Math.random()*valid.length)]}
    if (i<genLength)     {return emailConfGen(i, gen)} else {emailConfLinks.push(gen); return gen;}
}

module.exports = (function(){
  return {
        generate: function(req, res) {
            var gen = emailConfGen();
            console.log(gen);
            res.send(gen)
        },
        confirmEmail: function(req, res) {
            var contains = false;
            for (var hay of emailConfLinks) {
                if (hay == req.params.link) {
                    contains = true; }
            }
            if (contains) {
                emailConfLinks.splice(emailConfLinks.indexOf(req.params.link),1); }
            res.send(emailConfLinks);
        },
        create: function(req, res) {
            // console.log(req.body)

            models.Pendinguser.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                street_address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zipcode: req.body.zip,
                phone_number: req.body.phoneNumber,
                volunteer: req.body.volunteer
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

            console.log('holy shit made it to login');

            console.log('=========req.user in login=========');
            console.log(req.user);
            console.log('=========req.user in login=========');
            if(req.body.loginerror){
                console.log('=========error in req.user=========');
                console.log(req.body.loginerror);
                console.log('=========error in req.user=========');
                res.send('ERROR');
            }
            else{
                res.json(req.user);
            }
            //IF THERE'S ERRORS. CHANGE IF (FALSE) TO IF THERE ARE ERRORS
            // if (false) {
            //     res.json({errors: 'error'})
            // } else {
            //     res.json({success: 'ok'})
            // }
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
