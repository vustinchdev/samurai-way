import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RootStateType, store } from './redux/state'

let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={store.addPost.bind(store)}
                updateNewPostText={store.updateNewPostText.bind(store)}
                addMessage={store.addMessage.bind(store)}
                updateNewMessageText={store.updateNewMessageText.bind(store)} />
        </BrowserRouter>, document.getElementById('root')
    );
}


rerenderEntireTree(store.getState())

store.subscribe(rerenderEntireTree)