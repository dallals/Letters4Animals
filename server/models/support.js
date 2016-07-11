'use strict';
module.exports = function(sequelize, DataTypes) {
  var Support = sequelize.define('Support', {
    
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Support.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
        Support.belongsTo(models.Cause, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });
  return Support;
};