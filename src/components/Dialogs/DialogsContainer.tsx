import React from 'react'
import { addMessageAC, updateNewMessageTextAC } from '../../redux/dialogs-reducer'
import { Dialogs } from './Dialogs'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import { Dispatch } from 'redux'
import { DialogsPageType } from '../../redux/store'
import { withAuthRedirect } from '../../hoc/withAuthRedirect'




type MapStatePropsType = {
    dialogsPage: DialogsPageType
}

type MapDispatchPropsType = {
    sendMessage: () => void
    updateNewMessage: (text: string) => void
}

export type DialogsType = MapStatePropsType & MapDispatchPropsType

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
    return {
        sendMessage: () => dispatch(addMessageAC()),
        updateNewMessage: (text: string) => dispatch(updateNewMessageTextAC(text))
    }
}

const AuthRedirectComponent = withAuthRedirect(Dialogs)

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent)
