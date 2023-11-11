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

export type ProfilePageType = {
    posts: PostType[]
    newPostText: string
}

export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
    newMessageText: string
}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
}

export type ActionsType = AddPostACType | UpdateNewPostTextACType | AddMessageACType | UpdateNewMessageTextACType

export type StoreType = {
    _state: RootStateType
    getState: () => RootStateType
    _callSubscriber: (state: RootStateType) => void
    dispatch: (action: ActionsType) => void
    subscribe: (observer: (state: RootStateType) => void) => void
}


export const store: StoreType = {
    _state: {

        profilePage: {
            posts: [
                { id: 1, message: 'Hello, how are you?', likesCount: 15 },
                { id: 2, message: "It's my first post", likesCount: 20 }
            ],
            newPostText: ''
        },

        dialogsPage: {
            dialogs: [
                { id: 1, name: 'Dima' },
                { id: 2, name: 'Petr' },
                { id: 3, name: 'Sveta' },
                { id: 4, name: 'Viktor' },
                { id: 5, name: 'Valera' }
            ],
            messages: [
                { id: 1, message: 'hello' },
                { id: 2, message: 'How are you?' },
                { id: 3, message: 'hello' },
            ],
            newMessageText: ''
        }
    },
    _callSubscriber(state: RootStateType) {
        console.log('state changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    dispatch(action) {
        if (action.type === 'ADD-POST') {
            const newPost = {
                id: 5,
                message: this._state.profilePage.newPostText,
                likesCount: 0
            }
            this._state.profilePage.posts.push(newPost)
            this._state.profilePage.newPostText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
            this._state.profilePage.newPostText = action.newText
            this._callSubscriber(this._state)
        } else if (action.type === 'ADD-MESSAGE') {
            const newMessage = {
                id: 4,
                message: this._state.dialogsPage.newMessageText
            }
            this._state.dialogsPage.messages.push(newMessage)
            this._state.dialogsPage.newMessageText = ''
            this._callSubscriber(this._state)
        } else if (action.type === 'UPDATE-NEW-MESSAGE-TEXT') {
            this._state.dialogsPage.newMessageText = action.newText
            this._callSubscriber(this._state)
        }
    }
}

type AddPostACType = ReturnType<typeof addPostAC>

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
}

type AddMessageACType = ReturnType<typeof addMessageAC>

export const addMessageAC = () => {
    return {
        type: 'ADD-MESSAGE',
    } as const
}

type UpdateNewMessageTextACType = ReturnType<typeof updateNewMessageTextAC>

export const updateNewMessageTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        newText: text
    } as const
}


