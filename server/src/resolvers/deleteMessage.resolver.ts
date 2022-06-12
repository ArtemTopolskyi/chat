import { ApolloServer } from "apollo-server-express";
import { Subscription } from "../subscriptions";
import { MessageError, UserError } from "../constants";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

interface Arguments {
  messageId: number;
};

export const deleteMessageResolver = async (
  _: ApolloServer,
  { messageId }: Arguments,
  context: Context,
) => {
  const { authUser, models, pubsub } = context;

  checkAuthUser(authUser);

  const message = await models.Message.findByPk(messageId);

  if (!message) {
    throw new Error(MessageError.NotFound);
  }

  const participant = await models.ChatParticipant.findOne({
    where: {
      userId: authUser?.id,
      chatId: message.chatId,
    },
  })

  if (!participant) {
    throw new Error(UserError.NotChatParticipant)
  }

  const isMessageAuthor = message.senderId === participant.id;

  if (!isMessageAuthor) {
    throw new Error(UserError.NotMessageAuthor)
  }

  const deletedCount = await models.Message.destroy({
    where: {
      id: messageId,
    },
  });

  if (!deletedCount) {
    throw new Error(MessageError.WasNotDeleted);
  }

  await pubsub.publish(Subscription.MessageDeleted, {
    messageDeleted: message,
  });

  return true;
};
