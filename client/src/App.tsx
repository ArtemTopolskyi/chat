import React from 'react';
import { ChatPage } from './components/ChatPage';
import { Sidebar } from './components/Sidebar';
import './App.scss';
import { Header } from './components/Header';

const App = () => (
  <div className="app">
    <Sidebar />

    <div className='app__chat-container'>
      <Header />

      <ChatPage />
    </div>
  </div>
);

export default App;
