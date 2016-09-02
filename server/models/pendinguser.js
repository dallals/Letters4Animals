'use strict';

var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Pendinguser = sequelize.define('Pendinguser', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len: [2,25]
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      len: [2,25]
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true,
      len: [2,50]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [2,50]
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [2,50]
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      isIn: [["AK","AL","AR","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID", "IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY", "OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"]],
      len: [0,2]
    },
    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [5,10]
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
      len:[10,10]
    },
    phone_notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    email_notification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    volunteer: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    verify_url: {
      type: DataTypes.STRING,
      allowNull:true
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      },
      generateHash: function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return Pendinguser;
};
