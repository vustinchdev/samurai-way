type UserLocationType = {
    city: string
    country: string
}

type UserType = {
    id: number
    followed: boolean
    fullName: string
    status: string
    location: UserLocationType
}

export type InitialStateType = {
    users: UserType[]
}

let initialState: InitialStateType = {
    users: [
        { id: 1, followed: false, fullName: 'Dima', status: 'status', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 2, followed: true, fullName: 'Petr', status: 'status', location: { city: 'Moscow', country: 'Russia' } },
        { id: 3, followed: false, fullName: 'Sveta', status: 'status', location: { city: 'Minsk', country: 'Belarus' } }
    ]
}

type ActionsType = FollowACType | UnfollowACType | SetUsersType

export const usersReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
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