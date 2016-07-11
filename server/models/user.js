'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    phone_number: DataTypes.INTEGER,
    phone_notification: DataTypes.BOOLEAN,
    email_notification: DataTypes.BOOLEAN,
    volunteer: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN,
    login_count: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Support)
      }
    }
  });
  return User;
};