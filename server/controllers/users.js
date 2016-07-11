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
var includesS = function(haystack, needle) {
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
                console.log(req.body)

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
                })
                // res.json(req.body)
                // return sequelize.transaction(function (t) {

                //   // chain all your queries here. make sure you return them.
                //   return User.create({
                //     first_name: ,
                //     last_name: DataTypes.STRING,
                //     email: DataTypes.STRING,
                //     password: DataTypes.STRING,
                //     street_address: DataTypes.STRING,
                //     city: DataTypes.STRING,
                //     state: DataTypes.STRING,
                //     zipcode: DataTypes.INTEGER,
                //     phone_number: DataTypes.INTEGER,
                //     phone_notification: DataTypes.BOOLEAN,
                //     email_notification: DataTypes.BOOLEAN,
                //     volunteer: DataTypes.BOOLEAN,
                //     admin: DataTypes.BOOLEAN,
                //     login_count: DataTypes.INTEGER

                //   }, {transaction: t}).then(function (user) {
                //     return user.setShooter({
                //       firstName: 'John',
                //       lastName: 'Boothe'
                //     }, {transaction: t});
                //   });

                // }).then(function (result) {
                //   // Transaction has been committed
                //   // result is whatever the result of the promise chain returned to the transaction callback
                // }).catch(function (err) {
                //   // Transaction has been rolled back
                //   // err is whatever rejected the promise chain returned to the transaction callback
                // });

            // var newUser = new models.User(req.body);
            // newUser.save(function(err, data){
            //     if(err){
            //         console.log(err)
            //     }
            //     else{
            //         res.json(data)
            //     }
            // })
            // console.log(req.body);
            // res.json(req.body);
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
        },


  }//closes return
})();
