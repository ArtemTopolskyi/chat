import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { formatSendingTime } from '../../helpers';
import { Message } from '../../typedefs';
import './ChatMessage.scss';

interface Props {
  message: Message;
  isOwn: boolean;
}

export const ChatMessage: FC<Props> = ({ message, isOwn }) => {
  const { text, createdAt } = message;

  const sendingTime = useMemo(() => (
    formatSendingTime(new Date(createdAt))
  ), [createdAt])

  return (
    <div className={cn('chat-message', { isOwn })}>
      <p className='chat-message__text'>
        {text}
      </p>

      <p className='chat-message__time'>
        {sendingTime}
      </p>
    </div>
  );
};
