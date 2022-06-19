import React, { FC, useState, useMemo, useCallback } from 'react';
import { useChats } from '../../hooks/useChats';
import { ChatsList } from '../ChatsList';

export const ChatPage: FC = () => {
  const chats = useChats();

  const chatsMap = useMemo(() => (
    chats.reduce((map, chat) => {
      map.set(chat.id, chat);

      return map;
    }, new Map())
  ), [chats]);

  const [openedChatId, setOpenedChatId] = useState<number | null>(null);

  const openedChat = useMemo(() => (
    chatsMap.get(openedChatId) || null
  ), [chatsMap, openedChatId]);

  return (
    <div className='chat-page'>
      <ChatsList />

      <ChatPage />
    </div>
  );
};
