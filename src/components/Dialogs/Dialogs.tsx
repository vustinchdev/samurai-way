import React, { ChangeEvent } from 'react'
import s from './Dialogs.module.css'
import { DialogItem } from './DialogItem/DialogItem'
import { Message } from './Message/Message'
import { DialogsType } from './DialogsContainer'
import { Redirect } from 'react-router-dom'


export const Dialogs: React.FC<DialogsType> = (props) => {

    let newMessage = React.createRef<HTMLTextAreaElement>()

    const addNewMessage = () => {
        props.sendMessage()
    }

    let dialogsElements = props.dialogsPage.dialogs.map(d => <DialogItem key={d.id} id={d.id} name={d.name} />)
    let messagesElements = props.dialogsPage.messages.map(m => <Message key={m.id} message={m.message} />)

    const onChangeNewMessageHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.updateNewMessage(e.currentTarget.value)
    }

    if (!props.isAuth) return <Redirect to={'/login'} />

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
                            value={props.dialogsPage.newMessageText}
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
