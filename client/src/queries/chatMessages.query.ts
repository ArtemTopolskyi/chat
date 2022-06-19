import { gql } from '@apollo/client';

export const CHAT_MESSAGES_QUERY = gql`
  query chatMessages($chatId: Int!) {
    chatMessages(chatId: $chatId) {
      id
      senderId
      text
      createdAt
    }
  }
`;
