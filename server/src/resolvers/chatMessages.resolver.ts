import { ApolloServer } from "apollo-server-express";
import { checkChatParticipant } from "../helpers/checkChatParticipant";
import { Context } from "../typedefs";

interface Arguments {
  chatId: number;
};

export const chatMessagesResolver = async (
  _: ApolloServer,
  { chatId }: Arguments,
  context: Context,
) => {
  const { authUser, models } = context;

  await checkChatParticipant(authUser, chatId, models);

  return models.Message.findAll({
    where: {
      chatId,
    },
    order: [['created_at', 'asc']]
  })
};
