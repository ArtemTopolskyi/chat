import { ApolloServer } from "apollo-server-express";
import { Context } from "../typedefs";

type Arguments = unknown;

export const meResolver = (_: ApolloServer, __: Arguments, context: Context) => {
  const { authUser } = context;

  return 'Hello, Artem!:) Your id is:' + authUser?.id;
};
