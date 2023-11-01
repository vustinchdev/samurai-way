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
}

export type DialogsPageType = {
    dialogs: DialogType[]
    messages: MessageType[]
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
        ]
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
        ]
    }
}
