import React, { useState, useEffect } from 'react';
import Api from './Api';

import { ChatListItem } from './components/ChatListItem';
import { ChatIntro } from './components/ChatIntro';
import { ChatWindow } from './components/ChatWindow';
import { NewChat } from './components/NewChat';
import { Login } from './components/Login';

import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import SearchIcon from '@mui/icons-material/Search';
import './App.css';


function App() {
  const [chatList, setchatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user !== null) {
      let unsub = Api.onChatList(user.id, setchatList);
      return unsub;
    }
  }, [user]);

  const handleNewchat = () => {
    setShowNewChat(true);
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };
    await Api.addUser(newUser);
    setUser(newUser);
  }

  if (user === null) {
    return (<Login onReceive={handleLoginData} />)
  }

  return (
    <div className='app-window'>
      <div className='sidebar'>
        <NewChat
          chatlist={chatList}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className='header--avatar' src={user.avatar} alt='' />
          <div className='header--buttons'>
            <div className='header--btn'>
              <DonutLargeIcon style={{ color: '#919191' }} />
            </div>
            <div onClick={handleNewchat} className='header--btn'>
              <ChatIcon style={{ color: '#919191' }} />
            </div>
            <div className='header--btn'>
              <MoreVertIcon style={{ color: '#919191' }} />
            </div>
          </div>
        </header>
        <div className='search'>
          <div className="search--input">
            <SearchIcon style={{ color: '#919191', fontSize: 'small' }} />
            <input type='search' placeholder="Procurar ou inicicar uma nova conversa." />
          </div>
        </div>
        <div className='chatlist'>
          {chatList.map((i, k) => (
            <ChatListItem
              key={k}
              data={i}
              active={activeChat.chatId === chatList[k].chatId}
              onClick={() => setActiveChat(chatList[k])} />
          ))};
        </div>
      </div>
      <div className='contentarea'>
        {activeChat.chatId !== undefined &&
          <ChatWindow
            user={user}
            data={activeChat}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  );
}

export default App;
