import React, { ChangeEvent } from 'react'
import s from './MyPosts.module.css'
import { Post } from './Post/Post'
import { ActionsType, ProfilePageType } from '../../../redux/state'
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer'


type MyPostsType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.dispatch(addPostAC())
    }

    let postsElements = props.profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

    const onPostChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        let text = e.currentTarget.value
        props.dispatch(updateNewPostTextAC(text))
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea
                        onChange={onPostChangeHandler}
                        ref={newPostElement}
                        value={props.profilePage.newPostText}
                    />
                </div>
                <div>
                    <button onClick={addPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}
