'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'chats',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('chats', 'name');
  }
};
