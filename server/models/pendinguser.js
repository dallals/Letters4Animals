'use strict';

var bcrypt   = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Pendinguser = sequelize.define('Pendinguser', {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    street_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zipcode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      len: [5,5]
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
