import User from './User';
import Chat from './Chat';
import UserContact from './UserContact';
import ChatParticipant from './ChatParticipant';
import Message from './Message';

export const models = {
  User,
  UserContact,
  ChatParticipant,
  Chat,
  Message,
};

export type Models = typeof models;
