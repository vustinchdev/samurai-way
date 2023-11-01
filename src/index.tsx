import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

export type PostType = {
  id: number
  message: string
  likesCount: number
}

export type DialogType = {
  id: number
  name: string
}

export type MessageType = {
  id: number
  message: string
}


const posts: PostType[] = [
  { id: 1, message: 'Hello, how are you?', likesCount: 15 },
  { id: 2, message: "It's my first post", likesCount: 20 }
]

const dialogs: DialogType[] = [
  { id: 1, name: 'Dima' },
  { id: 2, name: 'Petr' },
  { id: 3, name: 'Sveta' },
  { id: 4, name: 'Viktor' },
  { id: 5, name: 'Valera' }
]

const messages: MessageType[] = [
  { id: 1, message: 'hello' },
  { id: 2, message: 'How are you?' },
  { id: 3, message: 'hello' },
]


ReactDOM.render(
  <App posts={posts} dialogs={dialogs} messages={messages} />,
  document.getElementById('root')
);