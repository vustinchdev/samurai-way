import { ActionsType, DialogsPageType } from "./store"

const initialState: DialogsPageType = {
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

export const dialogsReducer = (state = initialState, action: ActionsType): DialogsPageType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            const newMessage = {
                id: 4,
                message: state.newMessageText
            }
            state.messages.push(newMessage)
            state.newMessageText = ''
            return state
        case 'UPDATE-NEW-MESSAGE-TEXT':
            state.newMessageText = action.newText
            return state
        default:
            return state
    }
}

export type AddMessageACType = ReturnType<typeof addMessageAC>

export const addMessageAC = () => {
    return {
        type: 'ADD-MESSAGE',
    } as const
}

export type UpdateNewMessageTextACType = ReturnType<typeof updateNewMessageTextAC>

export const updateNewMessageTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-MESSAGE-TEXT',
        newText: text
    } as const
}