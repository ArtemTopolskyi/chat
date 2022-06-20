import { gql } from '@apollo/client';

export const CHATS_QUERY = gql`
  query chats {
    chats {
      id
      name
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
