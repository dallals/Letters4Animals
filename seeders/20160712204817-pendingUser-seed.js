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
    return queryInterface.bulkInsert('Pendingusers', [{
        first_name: 'pendinguser',
        last_name: 'lastname1',
        email: 'pend1@pend.com',
        password: 'test',
        street_address: '3003 SE Belmont St',
        city: 'Portland',
        state: 'OR',
        zipcode: "97214",
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: false,
        phone_number: "123456778",
        verify_url: '24h23kbjdskuhhj32weddasdffs1',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'Pending2',
        last_name: 'lastname2',
        email: 'pend2@pend.com',
        password: 'test',
        street_address: '311 South Lanai Street',
        city: 'Kahului',
        state: 'HI',
        zipcode: "96721",
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: false,
        phone_number: "333456778",
        verify_url: '24h23kbjdskuhhj32weddasdffs2',
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        first_name: 'Pending3',
        last_name: 'lastname3',
        email: 'pend3@pend.com',
        password: 'test',
        street_address: '158 Winthrop Street',
        city: 'Brooklyn',
        state: 'NY',
        zipcode: "11225",
        phone_notification: false,
        email_notification: false,
        volunteer: false,
        admin: false,
        phone_number: "2554356778",
        verify_url: '24h23kbjdskuhhj32weddasdffs3',
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
    return queryInterface.bulkDelete('Pendingusers', null, {});
  }
};
