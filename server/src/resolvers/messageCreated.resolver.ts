import { withFilter } from 'graphql-subscriptions';
import { Context } from '../typedefs';
import { Subscription } from '../subscriptions';
import Message from '../models/Message';

type Arguments = unknown;

interface Payload {
  messageCreated: Message,
}

export const messageCreatedResolver = {
  subscribe: withFilter(
    (_, __, { pubsub }: Context) => pubsub.asyncIterator(Subscription.MessageCreated),
    async (payload: Payload, _: Arguments, context: Context) => {
      const { models, authUser } = context;

      const { chatId } = payload.messageCreated;
      const userId = authUser?.id;
  
      const participant = await models.ChatParticipant.findOne({
        where: {
          userId,
          chatId,
        },
      });

      if (!participant) {
        return false;
      }

      return true;
    },
  ),
};
