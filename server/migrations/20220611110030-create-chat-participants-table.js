'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('chat_participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      chatId: {
        field: 'chat_id',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        field: 'user_id',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      }
    });

    await queryInterface.addConstraint('chat_participants', {
      fields: ['chat_id'],
      type: 'foreign key',
      name: 'chat',
      references: {
        table: 'chats',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('chat_participants', {
      fields: ['user_id'],
      type: 'foreign key',
      name: 'user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addIndex('chat_participants', ['chat_id']);
    await queryInterface.addIndex('chat_participants', ['user_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('chat_participants');
  }
};