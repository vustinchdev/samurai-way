import React from 'react'
import s from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'

type DialogItemPropsType = {
    id: string
    name: string
}

type MessagePropsType = {
    message: string
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    return (
        <div className={s.dialog}>
            <NavLink to={'/dialogs/' + props.id}>{props.name}</NavLink>
        </div>
    )
}

const Message: React.FC<MessagePropsType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <DialogItem id='1' name='Dima' />
                <DialogItem id='2' name='Petr' />
                <DialogItem id='3' name='Sveta' />
                <DialogItem id='4' name='Viktor' />
                <DialogItem id='5' name='Valera' />
            </div>
            <div className={s.messages}>
                <Message message='Hello' />
                <Message message='How are you?' />
                <Message message='hello' />
            </div>
        </div>
    )
}
