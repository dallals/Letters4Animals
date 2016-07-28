'use strict';
module.exports = function(sequelize, DataTypes) {
  var Cause = sequelize.define('Cause', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      len:[2,255]
    },
    description: {
      type: DataTypes.TEXT,
      len:[0,2048]
    },
    letter_body: {
      type: DataTypes.TEXT,
      len:[0,10240]
    },
    letter_footnote: {
      type: DataTypes.TEXT,
      len:[0,1024]
    },
    rep_level: {
      type: DataTypes.STRING,
      len:[0,50]
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    fixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    text_blurb: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[0,80]
    },
    email_blurb: {
      type: DataTypes.TEXT,
      allowNull: true,
      len:[0,2048]
    },
    fixed_name: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[0,50],
      isAlpha: true
    },
    fixed_address: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[0,50]
    },
    fixed_city: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[0,50],
    },
    fixed_state: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[0,2],
      isAlpha: true
    },
    fixed_zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[5,10],

    }

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Cause.hasMany(models.Support);
        Cause.hasMany(models.Guest);

      }
    }
  });
  return Cause;
};