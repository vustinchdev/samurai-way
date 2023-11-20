import React, { ChangeEvent } from 'react'
import { ActionsType, DialogsPageType } from '../../redux/store'
import { addMessageAC, updateNewMessageTextAC } from '../../redux/dialogs-reducer'
import { Dialogs } from './Dialogs'


type DialogsContainerType = {
    state: DialogsPageType
    dispatch: (action: ActionsType) => void
}

export const DialogsContainer: React.FC<DialogsContainerType> = (props) => {

    const addNewMessage = () => {
        props.dispatch(addMessageAC())
    }

    const onChangeNewMessage = (text: string) => {
        props.dispatch(updateNewMessageTextAC(text))
    }

    return <Dialogs state={props.state} sendMessage={addNewMessage}
        updateNewMessage={onChangeNewMessage}
    />
}
