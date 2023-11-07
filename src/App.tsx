import React from 'react';
import './App.css';
import { Header } from './components/Header/Header'
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Dialogs } from './components/Dialogs/Dialogs';
import { Route } from 'react-router-dom';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { RootStateType } from './redux/state';

type AppType = {
  state: RootStateType
  addPost: () => void
  updateNewPostText: (newText: string) => void
  addMessage: () => void
  updateNewMessageText: (newText: string) => void
}

const App: React.FC<AppType> = (props) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() => <Profile
          profilePage={props.state.profilePage}
          addPost={props.addPost}
          updateNewPostText={props.updateNewPostText}
        />}
        />
        <Route path='/dialogs' render={() => <Dialogs
          state={props.state.dialogsPage}
          addMessage={props.addMessage}
          updateNewMessageText={props.updateNewMessageText} />} />
        <Route path='/news' component={News} />
        <Route path='/music' component={Music} />
        <Route path='/settings' component={Settings} />
      </div>
    </div >
  );
}





export default App;
