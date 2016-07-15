'use strict';
module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define('Guest', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    street_address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.INTEGER,
    cause_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Causes", // Can be both a string representing the table name, or a reference to the model
        key:   "id"
      }
    }

     //,
    // cause_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Guest.belongsTo(models.Cause, {
          onDelete: "CASCADE",
          foreignKey: 'cause_id',
          constraints: false
        });
      }
    }
  });
  return Guest;
};