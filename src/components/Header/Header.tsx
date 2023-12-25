import React from 'react'
import s from './Header.module.css'
import { NavLink } from 'react-router-dom'

type HeaderType = {
    isAuth: boolean
    login: string | null
}

export const Header: React.FC<HeaderType> = (props) => {
    return (
        <header className={s.header}>
            <img src="https://e7.pngegg.com/pngimages/851/133/png-clipart-www-logo-internet-computer-icons-world-wide-web-web-design-text.png" />
            <div className={s.loginBlock}>
                {props.isAuth
                    ? props.login
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    )
}