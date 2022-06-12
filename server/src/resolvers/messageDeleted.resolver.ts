import { withFilter } from 'graphql-subscriptions';
import { Context } from '../typedefs';
import { Subscription } from '../subscriptions';
import Message from '../models/Message';

type Arguments = {
  chatId: number;
}

interface Payload {
  messageDeleted: Message,
}

export const messageDeletedResolver = {
  subscribe: withFilter(
    (_, __, { pubsub }: Context) => pubsub.asyncIterator(Subscription.MessageDeleted),
    async (payload: Payload, args: Arguments) => {
      const { chatId } = args;
      const  { messageDeleted } = payload;

      return chatId === messageDeleted.chatId;
    },
  ),
};
