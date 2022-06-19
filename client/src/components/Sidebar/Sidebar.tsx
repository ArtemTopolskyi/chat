import React, { FC } from 'react';
import './Sidebar.scss';

export const Sidebar: FC = () => (
  <div className='sidebar'>
    <div className='sidebar__avatar' />

    <div className='sidebar__tabs'>
      tab1

      tab2
    </div>

    <div className='sidebar__exit-button' />
  </div>
);
