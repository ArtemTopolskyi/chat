import Chat from "../models/Chat";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

type Arguments = unknown;

export const chatPreviewMessageResolver = async (
  chat: Chat,
  _: Arguments,
  context: Context,
) => {
  const { authUser, models } = context;

  checkAuthUser(authUser);

  const foundMessages = await models.Message.findAll({
    where: {
      chatId: chat.id,
    },
    order: ['created_at', 'DESC'],
    limit: 1,
    raw: true,
    nest: true,
  })

  if (!foundMessages.length) {
    return null;
  }

  return foundMessages[0];
};
