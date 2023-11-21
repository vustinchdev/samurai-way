import React from 'react'
import { addPostAC, updateNewPostTextAC } from '../../../redux/profile-reducer'
import { MyPosts } from './MyPosts'
import { StoreContext } from '../../../redux/StoreContext'


export const MyPostsContainer: React.FC = () => {

    return (
        <StoreContext.Consumer>
            {
                (store) => {

                    const state = store.getState()

                    const addPost = () => {
                        store.dispatch(addPostAC())
                    }

                    const onPostChange = (text: string) => {
                        store.dispatch(updateNewPostTextAC(text))
                    }

                    return <MyPosts
                        addPost={addPost}
                        updateNewPostText={onPostChange}
                        posts={state.profilePage.posts}
                        newPostText={state.profilePage.newPostText}
                    />
                }
            }
        </StoreContext.Consumer>
    )
}
