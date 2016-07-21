'use strict';
module.exports = function(sequelize, DataTypes) {
  var Pendingcause = sequelize.define('Pendingcause', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    letter_body: {
      type: DataTypes.TEXT
    },
    letter_footnote: {
      type: DataTypes.TEXT
    },
    rep_level: {
      type: DataTypes.STRING
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fixed_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fixed_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fixed_city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fixed_state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    fixed_zipcode: {
      type: DataTypes.STRING,
      allowNull: true
    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here

      }
    }
  });
  return Pendingcause;
};