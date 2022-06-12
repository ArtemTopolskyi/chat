'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        field: 'owner_id',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      contactId: {
        field: 'contact_id',
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at',
      },
      createdAt: {
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

    await queryInterface.addConstraint('user_contacts', {
      fields: ['owner_id'],
      type: 'foreign key',
      name: 'owner_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('user_contacts', {
      fields: ['contact_id'],
      type: 'foreign key',
      name: 'contact_user',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addIndex('user_contacts', ['owner_id']);
    await queryInterface.addIndex('user_contacts', ['contact_id']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('user_contacts');
  }
};