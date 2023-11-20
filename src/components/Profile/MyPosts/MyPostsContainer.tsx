import React, { ChangeEvent } from 'react'
import { ActionsType, ProfilePageType } from '../../../redux/store'
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer'
import { MyPosts } from './MyPosts'


type MyPostsContainerType = {
    profilePage: ProfilePageType
    dispatch: (action: ActionsType) => void
}

export const MyPostsContainer: React.FC<MyPostsContainerType> = (props) => {

    const addPost = () => {
        props.dispatch(addPostAC())
    }

    const onPostChange = (text: string) => {
        props.dispatch(updateNewPostTextAC(text))
    }

    return <MyPosts
        addPost={addPost}
        updateNewPostText={onPostChange}
        posts={props.profilePage.posts}
        newPostText={props.profilePage.newPostText}
    />
}
