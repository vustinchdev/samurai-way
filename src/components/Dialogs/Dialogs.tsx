import React, { ChangeEvent } from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { ActionsType, DialogsPageType } from '../../redux/store'
import { addMessageAC, updateNewMessageTextAC } from '../../redux/dialogs-reducer'


type DialogsType = {
    state: DialogsPageType
    dispatch: (action: ActionsType) => void
}

export const Dialogs: React.FC<DialogsType> = (props) => {

    let newMessage = React.createRef<HTMLTextAreaElement>()

    const addNewMessage = () => {
        props.dispatch(addMessageAC())
    }

    let dialogsElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} />)

    const onChangeNewMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.dispatch(updateNewMessageTextAC(text))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <div>
                        <textarea
                            ref={newMessage}
                            onChange={onChangeNewMessageHandler}
                            value={props.state.newMessageText}
                        />
                    </div>
                    <div>
                        <button onClick={addNewMessage}>add message</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
