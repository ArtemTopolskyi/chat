import React, { FC, useMemo } from 'react';
import { useAppContext } from '../../contexts/AppContext';
import { useChatMessages } from '../../hooks/useChatMessages';
import { Chat } from '../../typedefs';
import { ChatInput } from '../ChatInput';
import { MessageList } from '../MessageList';
import './ChatWindow.scss';

interface Props {
  chat: Chat;
}

export const ChatWindow: FC<Props> = ({ chat }) => {
  const { me } = useAppContext();

  const messages = useChatMessages(chat.id);

  const myParticipant = useMemo(() => (
    chat.participants.find((participant) => (participant.userId === me))
  ), [chat.participants, me]);

  if (!myParticipant) {
    return null;
  }

  return (
    <div className='chat-window'>
      <MessageList
        messages={messages}
        myParticipant={myParticipant}
      />

      <ChatInput
        chatId={chat.id}
      />
    </div>
  );
};
