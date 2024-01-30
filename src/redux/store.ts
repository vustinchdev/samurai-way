import { ProfileResponse } from "../api/api";
import { AddMessageACType } from "./dialogs-reducer";
import { AddPostACType } from "./profile-reducer";

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type DialogType = {
  id: number;
  name: string;
};

export type MessageType = {
  id: number;
  message: string;
};

export type ProfilePageType = {
  posts: PostType[];
  profile: ProfileResponse;
  status: string;
};

export type DialogsPageType = {
  dialogs: DialogType[];
  messages: MessageType[];
};

export type SidebarType = {};

export type RootStateType = {
  profilePage: ProfilePageType;
  dialogsPage: DialogsPageType;
  sidebar: SidebarType;
};

export type ActionsType = AddPostACType | AddMessageACType;

export type StoreType = {
  _state: RootStateType;
  getState: () => RootStateType;
  _callSubscriber: (state: RootStateType) => void;
  dispatch: (action: ActionsType) => void;
  subscribe: (observer: (state: RootStateType) => void) => void;
};

// export const store: StoreType = {
//     _state: {

//         profilePage: {
//             posts: [
//                 { id: 1, message: 'Hello, how are you?', likesCount: 15 },
//                 { id: 2, message: "It's my first post", likesCount: 20 }
//             ],
//             newPostText: ''
//
//         },

//         dialogsPage: {
//             dialogs: [
//                 { id: 1, name: 'Dima' },
//                 { id: 2, name: 'Petr' },
//                 { id: 3, name: 'Sveta' },
//                 { id: 4, name: 'Viktor' },
//                 { id: 5, name: 'Valera' }
//             ],
//             messages: [
//                 { id: 1, message: 'hello' },
//                 { id: 2, message: 'How are you?' },
//                 { id: 3, message: 'hello' },
//             ],
//             newMessageText: ''
//         },
//         sidebar: {}
//     },
//     _callSubscriber(state: RootStateType) {
//         console.log('state changed')
//     },

//     getState() {
//         return this._state
//     },
//     subscribe(observer) {
//         this._callSubscriber = observer
//     },

//     dispatch(action) {
//         this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
//         this._state.profilePage = profileReducer(this._state.profilePage, action)
//         this._state.sidebar = sidebarReducer(this._state.sidebar, action)
//         this._callSubscriber(this._state)
//     }
// }
