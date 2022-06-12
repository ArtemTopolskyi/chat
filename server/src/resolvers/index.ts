import { registerResolver } from "./register.resolver";
import { meResolver } from "./me";
import { loginResolver } from "./login.resolver";
import { authTokenResolver } from "./authToken.resolver";
import { dateScalar } from "./dateScalar";
import { createChatResolver } from "./createChat.resolver";
import { chatParticipantsResolver } from "./chatParticipants.resolver";
import { chatParticipantUsernameResolver } from "./chatParticipantUsername.resolver";
import { chatPreviewMessageResolver } from "./chatPreviewMessage.resolver";
import { chatsResolver } from "./chats.resolver";
import { chatMessagesResolver } from "./chatMessages.resolver";
import { sendMessageResolver } from "./sendMessage.resolver";
import { updateMessageResolver } from "./updateMessage.resolver";
import { deleteMessageResolver } from "./deleteMessage.resolver";
import { messageCreatedResolver } from "./messageCreated.resolver";
import { messageUpdatedResolver } from "./messageUpdated.resolver";
import { messageDeletedResolver } from "./messageDeleted.resolver";

export const resolvers = {
  Date: dateScalar,
  User: {
    authToken: authTokenResolver,
  },
  Chat: {
    participants: chatParticipantsResolver,
    previewMessage: chatPreviewMessageResolver,
  },
  ChatParticipant: {
    username: chatParticipantUsernameResolver,
  },
  Query: {
    me: meResolver,
    login: loginResolver,
    chats: chatsResolver,
    chatMessages: chatMessagesResolver,
  },
  Mutation: {
    register: registerResolver,
    createChat: createChatResolver,
    sendMessage: sendMessageResolver,
    updateMessage: updateMessageResolver,
    deleteMessage: deleteMessageResolver,
  },
  Subscription: {
    messageCreated: messageCreatedResolver,
    messageUpdated: messageUpdatedResolver,
    messageDeleted: messageDeletedResolver,
  },
};
