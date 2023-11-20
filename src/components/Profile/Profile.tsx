import React from 'react'
import s from './Profile.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { ActionsType, ProfilePageType } from '../../redux/store'
import { MyPostsContainer } from './MyPosts/MyPostsContainer'



type ProfileType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const Profile: React.FC<ProfileType> = (props) => {
    return (
        <main className={s.content}>
            <ProfileInfo />
            <MyPostsContainer
                profilePage={props.profilePage}
                dispatch={props.dispatch}
            />
        </main>
    )
}
