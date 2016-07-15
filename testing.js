var models = require('./server/models');
models.sequelize.sync()

// models.User.findAll({}).then(function(data){
// 	if(data){
// 		for (var i = 0; i < data.length; i++) {
// 			console.log(i+" index of data array", data[i].dataValues);
// 		}
// 		// console.log(data[0]);
// 	}
// 	else{
// 		console.log("error finding all users");
// 	}
// })

models.User.findAll({where: ["volunteer = ?", true]}).then(function(data){
	if(data){
		for (var i = 0; i < data.length; i++) {
			console.log(i+" index of data array", data[i].dataValues);
		}
		// console.log(data[0]);
	}
	else{
		console.log("error finding all users");
	}
})