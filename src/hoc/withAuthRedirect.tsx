import React, { ComponentType } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { RootStateType } from '../redux/redux-store'

type MapStateToProps = {
    isAuth: boolean
}

const mapStateToProps = (state: RootStateType): MapStateToProps => ({
    isAuth: state.auth.isAuth
})

export function withAuthRedirect<T>(Component: ComponentType<T>) {

    const RedirectComponent = (props: MapStateToProps) => {

        const { isAuth, ...restProps } = props

        if (!isAuth) return <Redirect to={'/login'} />
        return <Component {...restProps as T & {}} />
    }

    const ConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)
    return ConnectRedirectComponent
}

