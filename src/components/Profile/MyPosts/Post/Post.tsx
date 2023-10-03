import React, { FC } from 'react'
import s from './Post.module.css'

type PostType = {
    message: string
    likesCount: number
}

export const Post: FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src="https://www.meme-arsenal.com/memes/df2292c6c154dbedf5b22ab0fc54c755.jpg" />
            {props.message}
            <div>
                <span>like</span>{props.likesCount}
            </div>
        </div>
    )
}
