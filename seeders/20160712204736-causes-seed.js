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
    return queryInterface.bulkInsert('Causes', [{
      name: 'Cause1',
      description: 'Test Causes 1 Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'Senator',
      enabled: true,
      fixed: false,
      fixed_address: '717 South Leaf Dr.',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'Cause2',
      description: 'Test Causes 2 Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'President',
      enabled: true,
      fixed: false,
      fixed_address: '1600 Pennsylvania Ave., Washington, D.C.',
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
    return queryInterface.bulkDelete('Causes', null, {});
  }
};
