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
      name: 'Animal Cruelty and Factory Farming',
      description: 'Animals raised for food in the United States endure unspeakable suffering. The days of the family farm are over, and more than 97% of the meat and dairy Americans consume comes from factory farms.',
      letter_body: "Factory farming is the term used to describe the industrial process of breeding, raising, and slaughtering animals for human consumption on a mass-production scale, where profit and efficiency drive the industry practices and there is little to no regard for the welfare of the animal. Animals in the factory farming system are treated as commodities being exploited for profit with few laws to protect them.<NEWPAR>Many people don’t realize just how brutal and cruel the animal agriculture industries are, as those industries spend millions of dollars to hide the reality of what happens inside their walls. They also spend huge amounts of money on advertising campaigns to deceive the public about how the industry treats its animals.",
      letter_footnote: 'Letter Footnote 123123',
      rep_level: 'United States Senate',
      enabled: true,
      fixed: false,
      text_blurb: 'text blurb for cause1',
      email_blurb: 'email blurb for cause1',
      fixed_address: '717 South Leaf Dr.',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Cause2',
      description: 'Test Causes 2 Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'President of the United States',
      enabled: true,
      fixed: false,
      text_blurb: 'text blurb for cause2',
      email_blurb: 'email blurb for cause2',
      fixed_address: '1600 Pennsylvania Ave., Washington, D.C.',
      createdAt: new Date(),
      updatedAt: new Date()

    },
    {
      name: 'fixed address cause',
      description: 'Test Causes Description',
      letter_body: 'letter_body letter_body letter_body',
      rep_level: 'CEO of Company X',
      enabled: true,
      fixed: true,
      text_blurb: 'text blurb for cause3',
      email_blurb: 'email blurb for cause3',
      fixed_name: 'Bob Loblaw',
      fixed_address: '1600 Pennsylvania Ave',
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
    return queryInterface.bulkDelete('Causes', null, {});
  }
};
