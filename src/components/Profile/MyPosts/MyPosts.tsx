import React from 'react'
import s from './MyPosts.module.css'
import { Post } from './Post/Post'
import { ProfilePageType } from '../../../redux/state'


type MyPostsType = {
    profilePage: ProfilePageType
    addPost: () => void
    updateNewPostText: (newText: string) => void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        props.addPost()
    }

    let postsElements = props.profilePage.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

    const onPostChangeHandler = () => {
        let text = newPostElement.current?.value
        if (text) {
            props.updateNewPostText(text)
        }
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
