let rerenderEntireTree = (state: RootStateType) => {
    console.log('state changed')
}

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



export const state: RootStateType = {

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
}

export const addPost = () => {
    const newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0
    }
    state.profilePage.posts.push(newPost)
    state.profilePage.newPostText = ''
    rerenderEntireTree(state)
}

export const updateNewPostText = (newText: string) => {
    state.profilePage.newPostText = newText
    rerenderEntireTree(state)
}

export const addMessage = () => {
    debugger
    const newMessage = {
        id: 4,
        message: state.dialogsPage.newMessageText
    }
    state.dialogsPage.messages.push(newMessage)
    state.dialogsPage.newMessageText = ''
    rerenderEntireTree(state)
}

export const updateNewMessageText = (newText: string) => {
    state.dialogsPage.newMessageText = newText
    rerenderEntireTree(state)
}

export const subscribe = (observer: (state: RootStateType) => void) => {
    rerenderEntireTree = observer
}
