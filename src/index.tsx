import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { RootStateType, addMessage, addPost, state, subscribe, updateNewMessageText, updateNewPostText } from './redux/state'

let rerenderEntireTree = (state: RootStateType) => {
    ReactDOM.render(
        <BrowserRouter>
            <App
                state={state}
                addPost={addPost}
                updateNewPostText={updateNewPostText}
                addMessage={addMessage}
                updateNewMessageText={updateNewMessageText} />
        </BrowserRouter>, document.getElementById('root')
    );
}


rerenderEntireTree(state)

subscribe(rerenderEntireTree)