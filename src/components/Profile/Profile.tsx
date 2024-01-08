import React from 'react'
import s from './Profile.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { MyPostsContainer } from './MyPosts/MyPostsContainer'
import { ProfileResponseType } from '../../redux/profile-reducer'

export type ProfilePropsType = {
    profile: ProfileResponseType | null
    status: string
    updateStatus: (status: string) => void
}

export const Profile: React.FC<ProfilePropsType> = (props) => {
    return (
        <main className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus} />
            <MyPostsContainer />
        </main>
    )
}
