'use strict';
module.exports = function(sequelize, DataTypes) {
  var Guest = sequelize.define('Guest', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len:[2,25]
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len:[2,25]
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
      len:[2,50]
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      len:[2,50]
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len:[0,2]
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      len:[0,10]
    }
    //,
    // cause_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "Causes", // Can be both a string representing the table name, or a reference to the model
    //     key:   "id"
    //   }
    // }

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