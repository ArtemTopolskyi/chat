import { ApolloServer } from "apollo-server-express";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

type Arguments = unknown;

export const chatsResolver = async (_: ApolloServer, __: Arguments, context: Context) => {
  const { authUser, models } = context;

  checkAuthUser(authUser);

  return models.Chat.findAll({
    include: {
      model: models.ChatParticipant,
      where: {
        userId: authUser?.id,
      },
    },
    raw: true,
    nest: true,
  });
};
