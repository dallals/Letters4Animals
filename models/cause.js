'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cause = sequelize.define('Cause', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    letter_body: DataTypes.TEXT,
    rep_level: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Cause.hasMany(models.Support)

      }
    }
  });
  return Cause;
};