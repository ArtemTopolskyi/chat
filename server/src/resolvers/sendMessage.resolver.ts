import { ApolloServer } from "apollo-server-express";
import { Subscription } from "../subscriptions";
import { UserError } from "../constants";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

interface Arguments {
  fields: {
    chatId: number;
    text: string;
  }
};

export const sendMessageResolver = async (
  _: ApolloServer,
  { fields }: Arguments,
  context: Context,
) => {
  const { authUser, models, pubsub } = context;
  const { chatId, text } = fields;

  checkAuthUser(authUser);

  const participant = await models.ChatParticipant.findOne({
    where: {
      userId: authUser?.id,
      chatId,
    }
  })

  if (!participant) {
    throw new Error(UserError.NotChatParticipant)
  }

  const message = await models.Message.create({
    chatId,
    senderId: participant.id,
    text,
  });

  await pubsub.publish(Subscription.MessageCreated, {
    messageCreated: message,
  });

  console.log('after publish');

  return message;
};
