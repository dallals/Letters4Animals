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
    return queryInterface.bulkInsert('Guests', [{
        first_name: 'User1',
        last_name: 'last name of user 1',
        street_address: '123 way',
        city: '123 city',
        state: 'CA',
        zipcode: 12344,
        cause_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User2',
        last_name: 'last name of user 2',
        street_address: '123 way',
        city: '123 city',
        state: 'CA',
        zipcode: 12344,
        cause_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'User3',
        last_name: 'last name of user 3',
        street_address: '123 way',
        city: '123 city',
        state: 'CA',
        zipcode: 12344,
        cause_id: 2,
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
    return queryInterface.bulkDelete('Guests', null, {});
  }
};
