import { withFilter } from 'graphql-subscriptions';
import { Context } from '../typedefs';
import { Subscription } from '../subscriptions';
import Message from '../models/Message';

type Arguments = {
  chatId: number;
}

interface Payload {
  messageUpdated: Message,
}

export const messageUpdatedResolver = {
  subscribe: withFilter(
    (_, __, { pubsub }: Context) => pubsub.asyncIterator(Subscription.MessageUpdated),
    async (payload: Payload, args: Arguments) => {

      console.log({ payload, args });
      const { chatId } = args;
      const  { messageUpdated } = payload;

      return chatId === messageUpdated.chatId;
    },
  ),
};
