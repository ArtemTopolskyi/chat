import React, { FC, useState, useMemo } from 'react';
import { useChats } from '../../hooks/useChats';
import { ChatsList } from '../ChatsList';
import { ChatWindow } from '../ChatWindow';
import './ChatPage.scss';

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
      <ChatsList
        chats={chats}
        openedChatId={openedChatId}
        setOpenedChatId={setOpenedChatId}
      />

      {openedChat
        ? (
          <ChatWindow chat={openedChat} />
        )
        : (
          <p>Select chat...</p>
        )}
    </div>
  );
};
