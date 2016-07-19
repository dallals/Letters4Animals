'use strict';
var models = require('../server/models');
module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
        first_name: 'ADMIN1',
        last_name: 'LASTNAME1',
        email: 'test@test.com',
        password: models.User.generateHash('test'),
        street_address: '2211 North 1st Street',
        city: 'San Jose',
        state: 'CA',
        zipcode: "95131",
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: true,
        phone_number: "1234567708",
        login_count: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User2',
        last_name: 'lastname2',
        email: 'test2@test2.com',
        password: models.User.generateHash('test'),
        street_address: '780 Ash Street',
        city: 'Denver',
        state: 'CO',
        zipcode: "80220",
        phone_notification: true,
        email_notification: true,
        volunteer: true,
        admin: false,
        phone_number: "3334569778",
        login_count: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User3',
        last_name: 'lastname3',
        email: 'test3@test3.com',
        password: models.User.generateHash('test'),
        street_address: '600 4th Avenue South',
        city: 'Minneapolis',
        state: 'MN',
        zipcode: "55415",
        phone_notification: false,
        email_notification: true,
        volunteer: false,
        admin: false,
        phone_number: "2554356778",
        login_count: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});


  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
      return queryInterface.bulkDelete('Users', null, {});
  }
};
