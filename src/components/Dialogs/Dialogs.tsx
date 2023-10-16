import React from 'react'
import s from './Dialogs.module.css'

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog}>Dima</div>
                <div className={s.dialog}>Petr</div>
                <div className={s.dialog}>Sveta</div>
                <div className={s.dialog}>Alex</div>
                <div className={s.dialog}>Valera</div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hello</div>
                <div className={s.message}>How are you?</div>
            </div>
        </div>
    )
}
