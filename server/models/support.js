'use strict';
module.exports = function(sequelize, DataTypes) {
  var Support = sequelize.define('Support', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Support.belongsTo(models.User, {
          onDelete: 'cascade',
          foreignKey: 'user_id',
          constraints: false
        });
        Support.belongsTo(models.Cause, {
          onDelete: "CASCADE",
          foreignKey: 'cause_id',
          constraints: false
        });
      }
    }
  });
  return Support;
};