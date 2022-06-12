import ChatParticipant from "../models/ChatParticipant";
import { checkAuthUser } from "../helpers/checkAuthUser";
import { Context } from "../typedefs";
import { UserError } from "../constants";

type Arguments = unknown;

export const chatParticipantUsernameResolver = async (
  participant: ChatParticipant,
  _: Arguments,
  context: Context,
) => {
  const { authUser, models } = context;
  const { userId } = participant;

  checkAuthUser(authUser);

  const user = await models.User.findByPk(userId);

  if (!user) {
    throw new Error(UserError.UserNotExist);
  }

  return user.username;
};
