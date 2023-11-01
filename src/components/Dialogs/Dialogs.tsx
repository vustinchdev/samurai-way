import React from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { DialogType, MessageType } from '../..'

type DialogsType = {
    dialogs: DialogType[]
    messages: MessageType[]
}

export const Dialogs: React.FC<DialogsType> = (props) => {

    let dialogsElements = props.dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    let messagesElements = props.messages.map(m => <Message message={m.message} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
            </div>
        </div>
    )
}
