'use strict';

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
        first_name: 'User1',
        last_name: 'last name of user 1',
        email: 'test@test.scom',
        password: 'test',
        street_address: '123 way',
        city: '123 city',
        state: 'CA',
        zipcode: 12344,
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: false,
        phone_number: "123456778",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User2',
        last_name: 'last name of user 2',
        email: 'test2@test2.scom',
        password: 'test',
        street_address: '112323 way',
        city: '123434 city',
        state: 'WA',
        zipcode: 22344,
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: false,
        phone_number: "333456778",
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User3',
        last_name: 'last name of user 3',
        email: 'test3@test3.scom',
        password: 'test',
        street_address: '112312323 way',
        city: '123333 city',
        state: 'CA',
        zipcode: 55554,
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: false,
        phone_number: "2554356778",
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
