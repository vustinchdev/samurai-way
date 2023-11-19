import { addMessageAC, dialogsReducer, updateNewMessageTextAC } from "./dialogs-reducer"
import { DialogsPageType } from "./store"

let startState: DialogsPageType

beforeEach(() => {
    startState = {
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
})

test('correct message should be added to correct array', () => {

    const endState = dialogsReducer(startState, addMessageAC())

    expect(endState.messages.length).toBe(4)
    expect(endState.dialogs.length).toBe(5)
    expect(endState.messages[3].id).toBeDefined()
    expect(endState.messages[3].message).toBe(endState.newMessageText)
})


test('correct text should be added to newMessageText', () => {

    const endState = dialogsReducer(startState, updateNewMessageTextAC('what?'))

    expect(endState.newMessageText).toBe('what?')
})