import { ApolloServer } from "apollo-server-express";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

interface Arguments {
  userIds: number[];
}

export const createChatResolver = async (
  _: ApolloServer,
  { userIds }: Arguments,
  context: Context,
) => {
  const { authUser, models } = context;

  checkAuthUser(authUser);

  const chat = await models.Chat.create();

  await models.ChatParticipant.bulkCreate(
    userIds.map((userId) => ({ userId, chatId: chat.id })),
  );

  return chat;
};
