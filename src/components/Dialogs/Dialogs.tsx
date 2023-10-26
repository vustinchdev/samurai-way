import React from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'


export const Dialogs = () => {

    let dialogs = [
        { id: 1, name: 'Dima' },
        { id: 2, name: 'Petr' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Viktor' },
        { id: 5, name: 'Valera' }
    ]

    let messages = [
        { id: 1, message: 'hello' },
        { id: 2, message: 'How are you?' },
        { id: 3, message: 'hello' },
    ]

    let dialogsElements = dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    let messagesElements = messages.map(m => <Message message={m.message} />)

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
