var emailConfLinks = [],
    genLength      = 50;


var emailConfGen = function(i, gen) {
    var valid = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    if (i===undefined)   {i = 0;}   else {i++;}
    if (gen===undefined) {gen = ''} else {gen += valid[Math.floor(Math.random()*valid.length)]}
    if (i<genLength)     {return emailConfGen(i, gen)} else {emailConfLinks.push(gen); return gen;}
}
var includesS = function(haystack, needle) {
}

var models = require('../models');

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
            console.log(req.body);
            res.json(req.body);
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
        }

  }//closes return
})();
