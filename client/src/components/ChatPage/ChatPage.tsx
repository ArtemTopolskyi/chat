import React, { FC } from 'react';
import { useQuery } from '@apollo/client';
import { CHATS_QUERY } from './chats.query';

export const ChatPage: FC = () => {
  const { loading, error, data } = useQuery(CHATS_QUERY);

  console.log({ data });

  return (
    <div>
      chat page
    </div>
  );
};
