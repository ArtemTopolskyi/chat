import React, { FC } from 'react';
import { Message, Participant } from '../../typedefs';
import { ChatMessage } from '../ChatMessage';
import './MessageList.scss';

interface Props {
  messages: Message[];
  myParticipant: Participant;
}

export const MessageList: FC<Props> = ({ messages, myParticipant }) => (
  <ul className='message-list'>
    {messages.map((message) => {
      const isOwn = message.senderId === myParticipant.id;

      return (
        <li key={message.id}>
          <ChatMessage
            message={message}
            isOwn={isOwn}
          />
        </li>
      );
    })}
  </ul>
);
