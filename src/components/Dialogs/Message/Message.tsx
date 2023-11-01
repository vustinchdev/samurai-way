import React from 'react'
import s from './../Dialogs.module.css'

type MessageContentType = {
    message: string
}

export const Message: React.FC<MessageContentType> = (props) => {
    return (
        <div className={s.message}>{props.message}</div>
    )
}

