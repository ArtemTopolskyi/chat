import React, { useCallback, useState } from 'react';
import { ReactComponent as SendIcon } from '../../icons/sendIcon.svg';
import { useSendMessage } from '../../hooks/useSendMessage';
import './ChatInput.scss';

interface Props {
  chatId: number;
}

export const ChatInput: React.FC<Props> = ({ chatId }) => {
  const [text, setText] = useState('');

  const sendMessage = useSendMessage(chatId);

  const onSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    sendMessage({
      variables: {
        fields: {
          chatId,
          text,
        },
      },
    });

    setText('');
  }, [text, chatId, sendMessage]);

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }, [])

  return (
    <form
      className='chat-input'
      onSubmit={onSubmit}
    >
      <input
        className='chat-input__input'
        placeholder='Start typing...'
        onChange={onChange}
        value={text}
      />

      <button
        type='submit'
      >
        <SendIcon />
      </button>
    </form>
  );
};
