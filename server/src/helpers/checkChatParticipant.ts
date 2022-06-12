import { Models } from "../models";
import { UserError } from "../constants";
import User from "../models/User";

export const checkChatParticipant = async (
  authUser: User | null,
  chatId: number,
  models: Models,
): Promise<never | void> => {
  if (!authUser) {
    throw new Error(UserError.NotAuthUser);
  }

  const chatParticipant = await models.ChatParticipant.findOne({
    where: {
      userId: authUser.id,
      chatId,
    },
  });

  if (!chatParticipant) {
    throw new Error(UserError.NotChatParticipant);
  }
};
