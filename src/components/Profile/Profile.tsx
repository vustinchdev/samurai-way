import React from 'react'
import s from './Profile.module.css'
import { MyPosts } from './MyPosts/MyPosts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { ProfilePageType } from '../../redux/state'



type ProfileType = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export const Profile: React.FC<ProfileType> = (props) => {
    return (
        <main className={s.content}>
            <ProfileInfo />
            <MyPosts
                profilePage={props.profilePage}
                addPost={props.addPost}
                updateNewPostText={props.updateNewPostText}
            />
        </main>
    )
}
