import { Dispatch } from "redux"
import { ProfilePageType } from "./store"
import { profileAPI, usersAPI } from "../api/api"

const initialState: ProfilePageType = {
    posts: [
        { id: 1, message: 'Hello, how are you?', likesCount: 15 },
        { id: 2, message: "It's my first post", likesCount: 20 }
    ],
    newPostText: '',
    profile: null,
    status: ''
}

type ActionsType = AddPostACType | UpdateNewPostTextACType | SetUserProfile | SetStatus

export const profileReducer = (state = initialState, action: ActionsType): ProfilePageType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost = {
                id: 5,
                message: state.newPostText,
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case 'UPDATE-NEW-POST-TEXT': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        case 'SET-USER-PROFILE':
            return { ...state, profile: action.profile }
        case 'SET-STATUS':
            return { ...state, status: action.status }
        default:
            return state
    }
}

export type AddPostACType = ReturnType<typeof addPostAC>

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}

export type UpdateNewPostTextACType = ReturnType<typeof updateNewPostTextAC>

export const updateNewPostTextAC = (text: string) => {
    return {
        type: 'UPDATE-NEW-POST-TEXT',
        newText: text
    } as const
}

export type SetUserProfile = ReturnType<typeof setUserProfile>

export const setUserProfile = (profile: ProfileResponseType) => ({ type: 'SET-USER-PROFILE', profile } as const)

export type SetStatus = ReturnType<typeof setStatus>
export const setStatus = (status: string) => ({ type: 'SET-STATUS', status } as const)

export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getProfile(userId)
        .then(res => {
            dispatch(setUserProfile(res.data))
        })
}

export const getStatus = (userId: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(userId)
        .then((res) => {
            dispatch(setStatus(res.data))
        })
}

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
    profileAPI.getStatus(status)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setStatus(res.data))
            }
        })
}

type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileResponseType = {
    userId: number
    aboutMe: string
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: {
        small: string
        large: string
    }
}

