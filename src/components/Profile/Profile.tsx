import React from 'react'
import s from './Profile.module.css'
import { MyPosts } from './MyPosts/MyPosts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'
import { PostType } from '../..'

type ProfileType = {
    posts: PostType[]
}


export const Profile: React.FC<ProfileType> = (props) => {
    return (
        <main className={s.content}>
            <ProfileInfo />
            <MyPosts posts={props.posts} />
        </main>
    )
}
