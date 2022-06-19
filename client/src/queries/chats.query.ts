import { gql } from '@apollo/client';

export const CHATS_QUERY = gql`
  query chats {
    chats {
      id
      previewMessage {
        id
        senderId
        text
        createdAt
      }
      participants {
        id
        username
        userId
        chatId
      }
    }
  }
`;
