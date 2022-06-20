import React, { FC } from 'react';
import { Chat } from '../../typedefs';
import { ChatItem } from '../ChatItem';
import './ChatsList.scss';

interface Props {
  chats: Chat[];
  openedChatId: number | null;
  setOpenedChatId: (chatId: number) => void;
}
export const ChatsList: FC<Props> = ({
  chats,
  openedChatId,
  setOpenedChatId,
}) => {

  return (
    <ul className='chats-list'>
      {chats.map((chat) => (
        <li key={chat.id}>
           <ChatItem
            chat={chat}
            onSelect={setOpenedChatId}
            selected={openedChatId === chat.id}
          />
        </li>
      ))}
    </ul>
  );
};
