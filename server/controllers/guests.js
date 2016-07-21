var models = require('../models');

module.exports = (function(){

	return {
		   	// getAllGuests: function(req, res){
      //       	console.log("in getAllUsers");
      //       	models.sequelize.query('SELECT * FROM "Guests"', { type: models.sequelize.QueryTypes.SELECT})
      //       	.then(function(guests){
      //           console.log(guests);
      //           res.json(guests);
      //       })
      //   },
      getAllGuests: function(req, res){
               console.log("in getAllGuests");
               models.sequelize.query('SELECT "Guests".id, "Guests".first_name, "Guests".last_name, "Guests".cause_id, "Guests".zipcode, "Guests".state, "Guests".city, "Guests".street_address, "Causes".name as "cause_name" FROM "Guests" LEFT JOIN "Causes" ON "cause_id" = "Causes".id', { type: models.sequelize.QueryTypes.SELECT})
               .then(function(guests){
               console.log(guests);
               res.json(guests);
           })
       },
     	delGuest: function(req, res){
             var self = this;
             console.log(self);
             console.log('in delGuest');
             // Find usepasswor, find and delete user's supports, then delete user
             models.Guest.find({where: ['id = ?', req.body.id]})
             .then(function(guest){
                 models.Support.destroy({where: ['guest_id = ?', req.body.id]})
                 .then(function(destroyed){
                     guest.destroy()          
                     .then(function(){
                         // Send back all remaining users
                         self.getAllGuests(req, res)
                	})
             	})
         	})
     	},


	} //closes return


})();