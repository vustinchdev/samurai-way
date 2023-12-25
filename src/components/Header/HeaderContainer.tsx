import React from 'react'
import { Header } from './Header'
import axios from 'axios'
import { connect } from 'react-redux'
import { AuthDataType, setAuthUserData } from '../../redux/auth-reducer'
import { RootStateType } from '../../redux/redux-store'



class HeaderContainer extends React.Component<HeaderContainerType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true })
            .then(res => {
                if (res.data.resultCode === 0) {
                    this.props.setAuthUserData(res.data.data)
                }
            })
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
}

type HeaderContainerType = MapStateToPropsType & MapDispachToPropsType

export default connect(MapStateToProps, { setAuthUserData })(HeaderContainer)
