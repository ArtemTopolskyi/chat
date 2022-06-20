import { useMemo } from 'react';
import { useQuery } from "@apollo/client";
import { Message } from "../typedefs";
import { CHAT_MESSAGES_QUERY } from '../queries/chatMessages.query';

export const useChatMessages = (chatId: number): Message[] => {
  const { data, loading, error } = useQuery(CHAT_MESSAGES_QUERY, {
    variables: {
      chatId,
    },
  });

  const isReady = !loading && !error;

  const messages = useMemo(() => {
    if (isReady && data.chatMessages) {
      return data.chatMessages;
    }

    return [];
  }, [isReady, data]);

  return messages;
};
