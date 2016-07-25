'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    queryInterface.addColumn(
      "Causes",
      'enabled',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    ),
    queryInterface.addColumn(
      "Causes",
      'fixed',
      {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    ),
    queryInterface.addColumn(
      "Causes",
      'fixed_address',
      {
        type: Sequelize.STRING
      }
    )
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    queryInterface.removeColumn(
      "Causes",
      'enabled'
    ),
    queryInterface.removeColumn(
      "Causes",
      'fixed'
    ),
    queryInterface.removeColumn(
      "Causes",
      'fixed_address'
    )
  }
};
