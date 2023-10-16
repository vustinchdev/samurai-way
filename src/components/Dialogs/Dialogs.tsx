import React from 'react'
import s from './Dialogs.module.css'
import { NavLink } from 'react-router-dom'

export const Dialogs = () => {
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/1'>Dima</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/2'>Petr</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/3' >Sveta</NavLink>
                </div>
                <div className={s.dialog}>
                    <NavLink to='/dialogs/4' >Alex</NavLink>
                </div>
                <div>
                    <NavLink to='/dialogs/5' className={s.dialog}>Valera</NavLink>
                </div>
            </div>
            <div className={s.messages}>
                <div className={s.message}>Hello</div>
                <div className={s.message}>How are you?</div>
            </div>
        </div>
    )
}
