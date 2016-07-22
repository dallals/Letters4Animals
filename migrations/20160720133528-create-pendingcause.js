'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Pendingcauses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: 'id'
        }
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      letter_body: {
        type: Sequelize.TEXT
      },
      letter_footnote: {
        type: Sequelize.TEXT
      },
      rep_level: {
        type: Sequelize.STRING
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      fixed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      fixed_name:{
        type: Sequelize.STRING
      },
      fixed_address:{
        type: Sequelize.STRING
      },
      fixed_city:{
        type: Sequelize.STRING
      },
      fixed_state:{
        type: Sequelize.STRING
      },
      fixed_zipcode:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Pendingcauses');
  }
};