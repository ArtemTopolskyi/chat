import { ApolloServer } from "apollo-server-express";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

interface Arguments {
  userIds: number[];
  name?: string;
}

export const createChatResolver = async (
  _: ApolloServer,
  { userIds, name }: Arguments,
  context: Context,
) => {
  const { authUser, models } = context;

  checkAuthUser(authUser);

  const isPrivate = userIds.length === 1;

  let chatName;

  if (isPrivate) {
    const user = await models.User.findByPk(userIds[0]);

    chatName = user?.username;
  } else {
    chatName = name;
  }

  const chat = await models.Chat.create({
    name: chatName || 'Chat',
  });

  await models.ChatParticipant.bulkCreate(
    [...userIds, authUser?.id].map((userId) => ({ userId, chatId: chat.id })),
  );

  return chat;
};
