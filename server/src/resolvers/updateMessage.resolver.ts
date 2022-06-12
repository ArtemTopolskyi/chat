import { ApolloServer } from "apollo-server-express";
import { Subscription } from "../subscriptions";
import { UserError, MessageError } from "../constants";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

interface Arguments {
  fields: {
    messageId: number;
    text: string;
  }
};

export const updateMessageResolver = async (
  _: ApolloServer,
  { fields }: Arguments,
  context: Context,
) => {
  const { authUser, models, pubsub } = context;
  const { messageId, text } = fields;

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

  const [count, updatedMessages] = await models.Message.update({
    text,
  }, {
    where: {
      id: message.id,
    },
    returning: true,
  })

  if (count === 0) {
    throw new Error(MessageError.WasNotUpdated);
  }

  const updatedMessage = updatedMessages[0].get({ plain: true });

  await pubsub.publish(Subscription.MessageUpdated, {
    messageUpdated: updatedMessage,
  });
  
  return updatedMessage;
};
