import Chat from "../models/Chat";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";

type Arguments = unknown;

export const chatParticipantsResolver = async (
  chat: Chat,
  _: Arguments,
  context: Context,
) => {
  const { authUser, models } = context;

  checkAuthUser(authUser);

  return models.ChatParticipant.findAll({
    where: {
      chatId: chat.id,
    },
    raw: true,
    nest: true,
  })
};
