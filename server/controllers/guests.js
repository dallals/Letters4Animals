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
           models.sequelize.query('SELECT "Guests".*, "Causes".name as "cause_name" FROM "Guests" LEFT JOIN "Causes" ON "cause_id" = "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
             .then(function(guests){
             console.log(guests);
             res.json(guests);
         })
       },

      // delGuest: function(req, res){
      //   models.Guest.destroy({where: ['id = ?', req.body.id]}, function(err, data){
      //     if(err){
      //       console.log(err);
      //     }else{
      //       res.json(data)
      //     }
      //   })
      // },

      delGuest: function(req, res){
          var self = this;
        models.Guest.destroy({where: ['id = ?', req.body.id]})
          .then(function(guest){
            models.sequelize.query('SELECT "Guests".*, "Causes".name as "cause_name" FROM "Guests" LEFT JOIN "Causes" ON "cause_id" = "Causes".id;', { type: models.sequelize.QueryTypes.SELECT})
             .then(function(guests){
             console.log(guests);
             res.json(guests);
            }).catch(function(err){
              console.log(err)
            })
          })
        
      },

      addGuest: function(req, res) {
            // console.log(req.body.guest)
            if (req.body.guest) {
                models.Guest.create(
                  req.body.guest
                ).then(function(guest) {
                    res.json({success: true, data: guest.dataValues})
                }).catch(function(err) {
                    res.json({success: false, errors: err})
                })
            } else {
                console.log('Missing Guest');
            }
        }



	} //closes return


})();