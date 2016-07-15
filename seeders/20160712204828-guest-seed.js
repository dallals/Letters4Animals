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
        first_name: 'Guest1',
        last_name: 'smith1',
        street_address: '2400 University Blvd',
        city: 'Houston',
        state: 'TX',
        zipcode: "77005",
        cause_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'Guest2',
        last_name: 'smith2',
        street_address: '2399 N Highland Ave',
        city: 'Tampa',
        state: 'FL',
        zipcode: "33602",
        cause_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'Guest3',
        last_name: 'smith3',
        street_address: '30 Bridge St',
        city: 'Augusta',
        state: 'ME',
        zipcode: "04330",
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
