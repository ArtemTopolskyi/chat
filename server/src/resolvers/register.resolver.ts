import { ApolloServer } from "apollo-server-express";
import * as argon2 from "argon2";
import { Context } from "../typedefs";
import { LoginError } from '../constants';

interface Arguments {
  fields: {
    email: string;
    username: string;
    password: string;
  },
}

export const registerResolver = async (_: ApolloServer, { fields }: Arguments, context: Context) => {
  const { email, username, password } = fields;
  const { models } = context;

  validateUsername(username);
  validatePassword(password);

  const userWithSameEmail = await models.User.findOne({
    where: {
      email,
    },
  });

  if (userWithSameEmail) {
    throw new Error(LoginError.EmailAlreadyTaken);
  }

  const hashedPassword = await argon2.hash(password);

  const createdUser = await models.User.create({
    username,
    email,
    password: hashedPassword,
  })

  return createdUser;
};

function validateUsername(username: string): void | never {
  if (username.length < 5) {
    throw new Error(LoginError.IncorrectUsernameLength);
  }
}

function validatePassword(password: string): void | never {
  if (password.length < 5) {
    throw new Error(LoginError.IncorrectPasswordLength);
  }
}
