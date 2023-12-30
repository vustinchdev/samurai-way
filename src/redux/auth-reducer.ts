import { Dispatch } from "redux"
import { authAPI } from "../api/api"

export type AuthDataType = {
    id: number | null
    login: string | null
    email: string | null
}

type AuthType = {
    data: AuthDataType
    messages: string[]
    fieldsErrors: string[]
    resultCode: number
    isAuth: boolean
}

const initialState: AuthType = {
    data: {
        id: null,
        login: null,
        email: null,
    },
    messages: [],
    fieldsErrors: [],
    resultCode: 0,
    isAuth: false
}

export const authReducer = (state: AuthType = initialState, action: ActionsType): AuthType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                data: action.data,
                isAuth: true
            }
        default:
            return state
    }
}

type ActionsType = SetUserData

type SetUserData = ReturnType<typeof setAuthUserData>

export const setAuthUserData = (data: AuthDataType) => {
    return {
        type: 'SET-USER-DATA',
        data
    } as const
}

export const getAuthUserData = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAuthUserData(res.data.data))
            }
        })
}