import { ApolloServer } from "apollo-server-express";
import * as argon2 from "argon2";
import { Context } from "../typedefs";
import { LoginError } from '../constants';

interface Arguments {
  fields: {
    email: string;
    password: string;
  },
}

export const loginResolver = async (
  _: ApolloServer,
  { fields }: Arguments,
  context: Context,
) => {
  const { email, password } = fields;
  const { models } = context;

  const foundUser = await models.User.findOne({
    where: {
      email,
    },
  });

  if (!foundUser) {
    throwWrongDataError();
  }

  await checkPassword(foundUser.password, password);

  return foundUser;
};

async function checkPassword(hashedPassword: string, password: string): Promise<void | never> {
  try {
    const isPasswordCorrect = await argon2.verify(hashedPassword, password);

    if (!isPasswordCorrect) {
      throwWrongDataError();
    }
  } catch {
    throwWrongDataError();
  }
}

function throwWrongDataError(): never {
  throw new Error(LoginError.WrongData);
}


