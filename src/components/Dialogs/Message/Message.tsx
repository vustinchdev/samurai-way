import React from 'react'
import s from './../Dialogs.module.css'
import { MessageType } from '../../..'

type MessageDataType = {
    message: string
}

export const Message: React.FC<MessageDataType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

