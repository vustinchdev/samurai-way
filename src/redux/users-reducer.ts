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
    pageSize: number
    totalUsersCount: number
    currentPage: number
    isFetching: boolean
}

let initialState: UsersStateType = {
    users: [],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false
}

type ActionsType = FollowACType
    | UnfollowACType
    | SetUsersACType
    | SetCurrentPageACType
    | SetTotalUsersCountACType
    | SetIsFetching

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
                ...state, users: action.payload.users
            }
        case 'SET-CURRENT-PAGE':
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        case 'SET-TOTAL-USERS-COUNT':
            return {
                ...state,
                totalUsersCount: action.payload.totalUsersCount
            }
        case 'TOGGLE-IS-FETCHING':
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        default:
            return state
    }
}

type FollowACType = ReturnType<typeof follow>

export const follow = (userId: number) => {
    return {
        type: 'FOLLOW',
        payload: {
            userId
        }
    } as const
}

type UnfollowACType = ReturnType<typeof unfollow>

export const unfollow = (userId: number) => {
    return {
        type: 'UNFOLLOW',
        payload: {
            userId
        }
    } as const
}

type SetUsersACType = ReturnType<typeof setUsers>

export const setUsers = (users: UserType[]) => {
    return {
        type: 'SET-USERS',
        payload: {
            users
        }
    } as const
}

type SetCurrentPageACType = ReturnType<typeof setCurrentPage>

export const setCurrentPage = (currentPage: number) => {
    return {
        type: 'SET-CURRENT-PAGE',
        payload: {
            currentPage
        }
    } as const
}

type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>

export const setTotalUsersCount = (totalUsersCount: number) => {
    return {
        type: 'SET-TOTAL-USERS-COUNT',
        payload: {
            totalUsersCount
        }
    } as const
}

type SetIsFetching = ReturnType<typeof toggleIsFetching>

export const toggleIsFetching = (isFetching: boolean) => {
    return {
        type: 'TOGGLE-IS-FETCHING',
        payload: {
            isFetching
        }
    } as const
}