import { addPostAC, profileReducer, updateNewPostTextAC } from "./profile-reducer";
import { ProfilePageType } from "./state";

let startState: ProfilePageType

beforeEach(() => {
    startState = {
        posts: [
            { id: 1, message: 'Hello, how are you?', likesCount: 15 },
            { id: 2, message: "It's my first post", likesCount: 20 }
        ],
        newPostText: ''
    }
})

test('correct post should be added to array', () => {

    const endState = profileReducer(startState, addPostAC())

    expect(endState.posts.length).toBe(3)
    expect(endState.posts[2].id).toBeDefined()
    expect(endState.posts[2].likesCount).toBe(0)
    expect(endState.posts[2].message).toBe(endState.newPostText)
})

test('correct text should be added to newPostText', () => {

    const endState = profileReducer(startState, updateNewPostTextAC('hello'))

    expect(endState.newPostText).toBe('hello')
})