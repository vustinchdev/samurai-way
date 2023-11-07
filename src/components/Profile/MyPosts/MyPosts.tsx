import React from 'react'
import s from './MyPosts.module.css'
import { Post } from './Post/Post'
import { PostType } from '../../../redux/state'


type MyPostsType = {
    posts: PostType[]
    addPost: (postMessage: string) => void
}

export const MyPosts: React.FC<MyPostsType> = (props) => {

    let newPostElement = React.createRef<HTMLTextAreaElement>()

    const addPost = () => {
        let text = newPostElement.current?.value
        if (text) {
            props.addPost(text)
            if (newPostElement.current?.value) {
                newPostElement.current.value = ''
            }
        }
    }

    let postsElements = props.posts.map(p => <Post message={p.message} likesCount={p.likesCount} />)

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea ref={newPostElement}></textarea>
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
