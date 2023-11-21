import React from 'react'
import { addMessageAC, updateNewMessageTextAC } from '../../redux/dialogs-reducer'
import { Dialogs } from './Dialogs'
import { StoreContext } from '../../redux/StoreContext'


export const DialogsContainer: React.FC = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {
                    const state = store.getState()

                    const addNewMessage = () => {
                        store.dispatch(addMessageAC())
                    }

                    const onChangeNewMessage = (text: string) => {
                        store.dispatch(updateNewMessageTextAC(text))
                    }

                    return <Dialogs dialogsPage={state.dialogsPage} sendMessage={addNewMessage}
                        updateNewMessage={onChangeNewMessage}
                    />
                }
            }
        </StoreContext.Consumer>
    )
}
