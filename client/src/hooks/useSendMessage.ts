import { useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { CHAT_MESSAGES_QUERY } from '../queries/chatMessages.query';
import { SEND_MESSAGE_MUTATION } from '../queries/sendMessage.mutation';

export const useSendMessage = (chatId: number) => {
  const [sendMessage, { error }] = useMutation(SEND_MESSAGE_MUTATION, {
    update: (cache, result) => {
      cache.updateQuery({
        query: CHAT_MESSAGES_QUERY,
        variables: {
          chatId,
        }
      }, (queryData) => ({
        chatMessages: [...queryData.chatMessages, result.data.sendMessage],
      }));
    }
  });

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  return sendMessage;
};
