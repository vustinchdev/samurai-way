import React from 'react'
import { addMessageAC, updateNewMessageTextAC } from '../../redux/dialogs-reducer'
import { Dialogs } from './Dialogs'
import { StoreType } from '../../redux/redux-store'


type DialogsContainerType = {
    store: StoreType
}

export const DialogsContainer: React.FC<DialogsContainerType> = (props) => {

    const state = props.store.getState()

    const addNewMessage = () => {
        props.store.dispatch(addMessageAC())
    }

    const onChangeNewMessage = (text: string) => {
        props.store.dispatch(updateNewMessageTextAC(text))
    }

    return <Dialogs dialogsPage={state.dialogsPage} sendMessage={addNewMessage}
        updateNewMessage={onChangeNewMessage}
    />
}
