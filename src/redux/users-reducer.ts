type UserLocationType = {
    city: string
    country: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: {
        small: null | string
        large: null | string
    }
    followed: boolean
    location: UserLocationType
}

export type UsersStateType = {
    users: UserType[]
}

let initialState: UsersStateType = {
    users: []
}

type ActionsType = FollowACType | UnfollowACType | SetUsersType

export const usersReducer = (state: UsersStateType = initialState, action: ActionsType): UsersStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? { ...u, followed: true } : u)
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => u.id === action.payload.userId ? { ...u, followed: false } : u)
            }
        case 'SET-USERS':
            return {
                ...state, users: [...state.users, ...action.payload.users]
            }
        default:
            return state
    }
}

type FollowACType = ReturnType<typeof followAC>

export const followAC = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}

type UnfollowACType = ReturnType<typeof unfollowAC>

export const unfollowAC = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}

type SetUsersType = ReturnType<typeof setUsersAC>

export const setUsersAC = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        payload: {
            users
        }
    } as const
}