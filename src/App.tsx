import React from 'react';
import './App.css';
import { Header } from './components/Header/Header'
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Dialogs } from './components/Dialogs/Dialogs';
import { BrowserRouter, Route } from 'react-router-dom';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { DialogType, MessageType, PostType } from '.';

type AppType = {
  posts: PostType[]
  dialogs: DialogType[]
  messages: MessageType[]
}

const App: React.FC<AppType> = (props) => {

  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <Header />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/profile' render={() => <Profile posts={props.posts} />} />
          <Route path='/dialogs' render={() => <Dialogs dialogs={props.dialogs} messages={props.messages} />} />
          <Route path='/news' component={News} />
          <Route path='/music' component={Music} />
          <Route path='/settings' component={Settings} />
        </div>
      </BrowserRouter>
    </div>
  );
}





export default App;
