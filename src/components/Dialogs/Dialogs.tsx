import React from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { DialogsPageType } from '../../redux/state'


type DialogsType = {
    state: DialogsPageType
}

export const Dialogs: React.FC<DialogsType> = (props) => {

    let newMessage = React.createRef<HTMLTextAreaElement>()

    const addNewMessage = () => {
        let textNewMessage = newMessage.current?.value
    }

    let dialogsElements = props.state.dialogs.map(d => <DialogItem id={d.id} name={d.name} />)
    let messagesElements = props.state.messages.map(m => <Message message={m.message} />)

    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                {messagesElements}
                <div>
                    <div>
                        <textarea ref={newMessage}></textarea>
                    </div>
                    <div>
                        <button onClick={addNewMessage}>add message</button>
                    </div>
                </div>
            </div>

        </div>
    )
}
