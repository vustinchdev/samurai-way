import React from 'react'
import s from './Profile.module.css'
import { MyPosts } from './MyPosts/MyPosts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { ProfilePageType } from '../../redux/state'



type ProfileType = {
    state: ProfilePageType
}

export const Profile: React.FC<ProfileType> = (props) => {
    return (
        <main className={s.content}>
            <ProfileInfo />
            <MyPosts posts={props.state.posts} />
        </main>
    )
}
