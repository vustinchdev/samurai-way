import React from 'react'
import { addMessageAC, updateNewMessageTextAC } from '../../redux/dialogs-reducer'
import { Dialogs } from './Dialogs'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import { Dispatch } from 'redux'
import { DialogsPageType } from '../../redux/store'

type MapStatePropsType = {
    dialogsPage: DialogsPageType
    isAuth: boolean
}

type MapDispatchPropsType = {
    sendMessage: () => void
    updateNewMessage: (text: string) => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: () => dispatch(addMessageAC()),
        updateNewMessage: (text: string) => dispatch(updateNewMessageTextAC(text))
    }
}

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs)
