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
import { ActionsType, RootStateType } from './redux/store';

type AppType = {
  state: RootStateType
  dispatch: (action: ActionsType) => void
}

const App: React.FC<AppType> = (props) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() => <Profile
          profilePage={props.state.profilePage}
          dispatch={props.dispatch}
        />}
        />
        <Route path='/dialogs' render={() => <Dialogs
          state={props.state.dialogsPage}
          dispatch={props.dispatch} />} />
        <Route path='/news' component={News} />
        <Route path='/music' component={Music} />
        <Route path='/settings' component={Settings} />
      </div>
    </div >
  );
}





export default App;
