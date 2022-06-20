import React from 'react';
import { ChatPage } from './components/ChatPage';
import { Sidebar } from './components/Sidebar';
import './App.scss';
import { Header } from './components/Header';
import { AppContext } from './contexts/AppContext';
import { useMe } from './hooks/useMe';

const App = () => {
  const me = useMe();

  if (!me) {
    return <p>Loading...</p>
  }

  return (
    <AppContext.Provider value={{ me: me.id }}>
      <div className="app">
        <Sidebar />

        <div className='app__chat-container'>
          <Header />

          <ChatPage />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
