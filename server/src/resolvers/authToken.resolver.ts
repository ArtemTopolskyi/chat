import { generateAuthToken } from "../helpers/generateAuthToken";
import User from "../models/User";
import { Context } from "../typedefs";

type Arguments = unknown;

export const authTokenResolver = (user: User, _: Arguments, context: Context) => {
  return generateAuthToken(user, context.secret);
};
