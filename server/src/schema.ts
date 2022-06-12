import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  scalar Date

  type Query {
    me: String!
    login(fields: LoginFields!): User!
    chats: [Chat!]!
    chatMessages(chatId: Int!): [Message!]!
  }

  type Mutation {
    register(fields: RegisterUserFields!): User!
    createChat(userIds: [Int!]!): Chat!
    sendMessage(fields: SendMessageFields!): Message!
    updateMessage(fields: UpdateMessageFields!): Message!
    deleteMessage(messageId: Int!): Boolean!
  }

  type Subscription {
    messageCreated: Message!
    messageUpdated(chatId: Int!): Message!
    messageDeleted(chatId: Int!): Message!
  }

  type User {
    id: Int!
    username: String!
    email: String!
    authToken: String!
  }

  type Chat {
    id: Int!
    previewMessage: Message
    participants: [ChatParticipant!]!
  }

  type ChatParticipant {
    id: Int!
    username: String!
    userId: Int!
    chatId: Int!
  }

  type Message {
    id: Int!
    senderId: Int!
    text: String!
    createdAt: Date!
  }
  
  type UserContact {
    contactUsername: String!
  }

  input RegisterUserFields {
    username: String!
    email: String!
    password: String!
  }

  input LoginFields {
    email: String!
    password: String!
  }

  input SendMessageFields {
    chatId: Int!
    text: String!
  }

  input UpdateMessageFields {
    messageId: Int!
    text: String!
  }
`;
