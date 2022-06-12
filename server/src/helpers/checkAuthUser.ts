import { UserError } from "../constants";
import User from "../models/User";

export const checkAuthUser = (authUser: User | null): never | void => {
  if (!authUser) {
    throw new Error(UserError.NotAuthUser);
  }
};
