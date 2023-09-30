import React from 'react'
import s from './Profile.module.css'
import { MyPosts } from './MyPosts/MyPosts'

export const Profile = () => {
    return (
        <main className={s.content}>
            <div>
                <img src="https://images.unsplash.com/photo-1610878180933-123728745d22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FuYWRhJTIwbmF0dXJlfGVufDB8fDB8fHww&w=1000&q=80" alt="" />
            </div>
            <div>
                ava + description
            </div>
            <MyPosts />
        </main>
    )
}
