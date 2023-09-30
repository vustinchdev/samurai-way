import React from 'react'
import s from './Post.module.css'

export const Post = () => {
    return (
        <div className={s.item}>
            <img src="https://www.meme-arsenal.com/memes/df2292c6c154dbedf5b22ab0fc54c755.jpg" />
            post
            <div>
                <span>like</span>
            </div>
        </div>
    )
}
