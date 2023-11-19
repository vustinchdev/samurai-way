import { ActionsType, ProfilePageType } from "./store"

const initialState: ProfilePageType = {
    posts: [
        { id: 1, message: 'Hello, how are you?', likesCount: 15 },
        { id: 2, message: "It's my first post", likesCount: 20 }
    ],
    newPostText: ''
}

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST':
            const newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            state.posts.push(newPost)
            state.newPostText = ''
            return state
        case 'UPDATE-NEW-POST-TEXT':
            state.newPostText = action.newText
            return state
        default:
            return state
    }
}

export type AddPostACType = ReturnType<typeof addPostAC>

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
}

