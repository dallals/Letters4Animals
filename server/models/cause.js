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
      isIn: [["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]]
    },
    fixed_zipcode: {
      type: DataTypes.STRING,
      allowNull: true,
      len:[0,10],

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