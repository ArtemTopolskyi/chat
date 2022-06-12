'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      senderId: {
        field: 'sender_id',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      chatId: {
        field: 'chat_id',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        field: 'text',
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
        field: 'deleted_at',
      }
    });

    await queryInterface.addConstraint('messages', {
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
    await queryInterface.addConstraint('messages', {
      fields: ['sender_id'],
      type: 'foreign key',
      name: 'chat_participant',
      references: {
        table: 'chat_participants',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addIndex('messages', ['chat_id']);
    await queryInterface.addIndex('messages', ['sender_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('messages');
  }
};