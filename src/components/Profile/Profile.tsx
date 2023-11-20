import React from 'react'
import s from './Profile.module.css'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { MyPostsContainer } from './MyPosts/MyPostsContainer'
import { StoreType } from '../../redux/redux-store'



type ProfileType = {
    store: StoreType
}

export const Profile: React.FC<ProfileType> = (props) => {
    return (
        <main className={s.content}>
            <ProfileInfo />
            <MyPostsContainer store={props.store} />
        </main>
    )
}
