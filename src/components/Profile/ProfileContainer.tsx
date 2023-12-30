import React from 'react'
import { Profile } from './Profile'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/redux-store'
import { ProfileResponseType, setUserProfile, getUserProfile } from '../../redux/profile-reducer'
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom'

type MapStateToPropsType = {
    profile: ProfileResponseType | null
    iaAuth: boolean
}

type MapDispatchToPropsType = {
    setUserProfile: (profile: ProfileResponseType) => void
    getUserProfile: (userId: string) => void
}

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType

type PathParamsType = {
    userId: string
}

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType

class ProfileContainer extends React.Component<PropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        this.props.getUserProfile(userId)
    }

    render() {

        if (!this.props.iaAuth) return <Redirect to={'/login'} />

        return (
            <Profile profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    iaAuth: state.auth.isAuth
})

const WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, { setUserProfile, getUserProfile })(WithUrlDataContainerComponent)