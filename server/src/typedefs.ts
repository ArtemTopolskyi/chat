import { Request, Response } from "express";
import { Sequelize } from "sequelize-typescript";
import User from "./models/User";
import { Models } from "./models";
import { PubSub } from "graphql-subscriptions";

export interface Context {
  db: Sequelize;
  models: Models;
  req: Request;
  res: Response;
  authUser: User | null;
  secret: string;
  pubsub: PubSub;
}
