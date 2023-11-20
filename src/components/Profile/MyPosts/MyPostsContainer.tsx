import React from 'react'
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer'
import { MyPosts } from './MyPosts'
import { StoreType } from '../../../redux/redux-store'


type MyPostsContainerType = {
    store: StoreType
}

export const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {

    const state = props.store.getState()

    const addPost = () => {
        props.store.dispatch(addPostAC())
    }

    const onPostChange = (text: string) => {
        props.store.dispatch(updateNewPostTextAC(text))
    }

    return <MyPosts
        addPost={addPost}
        updateNewPostText={onPostChange}
        posts={state.profilePage.posts}
        newPostText={state.profilePage.newPostText}
    />
}
