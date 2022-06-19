import React, { useMemo } from 'react';
import { getFormattedDate } from '../../helpers';
import './Header.scss';

export const Header = () => {
  const date = getFormattedDate(new Date());

  return (
    <header className='header'>
      <input
        placeholder='Search'
        className='header__search'
      />

      <p className='header__date'>
        {date}
      </p>
    </header>
  );
};
