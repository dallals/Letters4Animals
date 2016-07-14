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
  //   return queryInterface.bulkInsert('Supports', [{
  //     user_id: 1,
  //     cause_id: 1,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },{
  //     user_id: 2,
  //     cause_id: 1,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },{
  //     user_id: 1,
  //     cause_id: 2,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   },{
  //     user_id: 2,
  //     cause_id: 2,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
     return queryInterface.bulkDelete('Supports', null, {});

  }
};
