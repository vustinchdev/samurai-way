import React from 'react';
import './App.css';
import { Header } from './components/Header/Header'
import { Navbar } from './components/Navbar/Navbar';
import { Profile } from './components/Profile/Profile';
import { Route } from 'react-router-dom';
import { News } from './components/News/News';
import { Music } from './components/Music/Music';
import { Settings } from './components/Settings/Settings';
import { ActionsType, RootStateType } from './redux/store';
import { DialogsContainer } from './components/Dialogs/DialogsContainer';
import { StoreType } from './redux/redux-store';

type AppType = {
  state: RootStateType
  dispatch: (action: ActionsType) => void
  store: StoreType
}

const App: React.FC<AppType> = (props) => {

  return (
    <div className='app-wrapper'>
      <Header />
      <Navbar />
      <div className='app-wrapper-content'>
        <Route path='/profile' render={() => <Profile store={props.store} />} />
        <Route path='/dialogs' render={() => <DialogsContainer store={props.store} />} />
        <Route path='/news' component={News} />
        <Route path='/music' component={Music} />
        <Route path='/settings' component={Settings} />
      </div>
    </div >
  );
}





export default App;
