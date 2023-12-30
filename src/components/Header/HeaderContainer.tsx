import React from 'react'
import { Header } from './Header'
import { connect } from 'react-redux'
import { AuthDataType, setAuthUserData, getAuthUserData } from '../../redux/auth-reducer'
import { RootStateType } from '../../redux/redux-store'



class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        this.props.getAuthUserData()
    }

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} />
    }
}

const MapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    login: state.auth.data.login
})

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
}
type MapDispachToPropsType = {
    setAuthUserData: (data: AuthDataType) => void
    getAuthUserData: () => void
}

type HeaderContainerType = MapStateToPropsType & MapDispachToPropsType

export default connect(MapStateToProps, { setAuthUserData, getAuthUserData })(HeaderContainer)
