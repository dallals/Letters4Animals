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
    return queryInterface.bulkInsert('Pendingcauses', [{
      name: 'Pendingcause1',
      user_id: 2,
      description: 'Test Pendingcauses 1 Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'Senator',
      enabled: true,
      fixed: false,
      fixed_address: '717 South Leaf Dr.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Pendingcause2',
      user_id: 3,
      description: 'Test Pendingcauses 2 Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'President',
      enabled: true,
      fixed: false,
      fixed_address: '1600 Pennsylvania Ave., Washington, D.C.',
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      name: 'fixed address Pendingcause',
      user_id: 2,
      description: 'Test Pendingcauses Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'Congressman',
      enabled: true,
      fixed: true,
      fixed_name: 'Jim, CEO of Company X',
      fixed_address: '1600 Pennsylvania Ave.',
      fixed_city: 'Seattle',
      fixed_state: 'WA',
      fixed_zipcode: '23493',
      createdAt: new Date(),
      updatedAt: new Date()

    }
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Pendingcauses', null, {});
  }
};
