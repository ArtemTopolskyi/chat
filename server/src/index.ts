import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { PubSub } from 'graphql-subscriptions';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { DocumentNode } from 'graphql';
import { sequelize } from './database/initDb';
import { models } from './models';
import { getAuthUser } from './helpers/getAuthUser';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || '';

async function startApolloServer(typeDefs: DocumentNode, resolvers: {}) {
  await sequelize.authenticate();

  const pubsub = new PubSub();

  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const serverCleanup = useServer({
    schema,
    context: async (ctx) => {
      const authToken = String(ctx.connectionParams?.authentication);
      const authUser = await getAuthUser(authToken, JWT_SECRET_KEY, models);

      return {
        pubsub,
        models,
        authUser,
      };
    },
  }, wsServer);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    context: async ({ req, res }) => {
      const authToken = req.headers.authorization || '';
      const authUser = await getAuthUser(authToken, JWT_SECRET_KEY, models);

      return {
        models,
        sequelize,
        req,
        res,
        secret: JWT_SECRET_KEY,
        authUser,
        pubsub,
      };
    },
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  const corsOptions = {
    origin: ['https://studio.apollographql.com'],
    credentials: true,
  };

  server.applyMiddleware({
    app,
    cors: corsOptions,
    path: "/graphql",
  });

  await new Promise<void>(resolve => httpServer.listen({ port: SERVER_PORT }, resolve));

  console.log(`🚀 Server ready at http://localhost:${SERVER_PORT}${server.graphqlPath}`);
  console.log(
    `🚀 Subscription endpoint ready at ws://localhost:${SERVER_PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
