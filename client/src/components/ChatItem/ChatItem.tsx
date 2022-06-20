import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { Chat } from '../../typedefs';
import './ChatItem.scss';

interface Props {
  chat: Chat;
  onSelect: (chatId: number) => void;
  selected: boolean;
}

export const ChatItem: FC<Props> = ({ chat, onSelect, selected }) => {
  const { previewMessage, name, id } = chat;

  const onClick = useCallback(() => {
    onSelect(id);
  }, [onSelect, id]);
  
  return (
    <button
      className={cn('chat-item', { selected })}
      onClick={onClick}
    >
      <div className='chat-item__avatar' />

      <div className='chat-item__info'>
        <p className='chat-item__name'>
          {name}
        </p>

        {previewMessage && (
           <p className='chat-item__message'>
            {previewMessage.text}
          </p>
        )}
      </div>
    </button>
  );
};
