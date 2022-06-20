import { gql } from '@apollo/client';

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($fields: SendMessageFields!) {
    sendMessage(fields: $fields) {
      id
      senderId
      text
      createdAt
    }
  }
`;
