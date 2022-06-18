import { gql } from '@apollo/client';

export const CHATS_QUERY = gql`
  query chats {
    chats {
      id
    }
  }
`;
