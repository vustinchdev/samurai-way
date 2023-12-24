import React from 'react'
import { Profile } from './Profile'
import axios from 'axios'
import { connect } from 'react-redux'
import { RootStateType } from '../../redux/store'
import { ProfileResponseType, setUserProfile } from '../../redux/profile-reducer'

type MapStateToProps = {
    profile: ProfileResponseType | null
}

type MapDispatchToProps = {
    setUserProfile: (profile: ProfileResponseType) => void
}

type ProfileContainerType = MapStateToProps & MapDispatchToProps

class ProfileContainer extends React.Component<ProfileContainerType> {

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
            .then(res => {
                this.props.setUserProfile(res.data)
            })
    }

    render() {
        return (
            <Profile profile={this.props.profile} />
        )
    }
}

const mapStateToProps = (state: RootStateType) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, { setUserProfile })(ProfileContainer)