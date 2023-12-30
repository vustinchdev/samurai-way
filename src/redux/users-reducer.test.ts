import { UsersStateType, followSuccess, setUsers, unfollowSuccess, usersReducer } from "./users-reducer";

let statrtState: UsersStateType

beforeEach(() => {
    statrtState = {
        users: [
            {
                id: 1,
                name: 'Dima',
                status: 'status',
                photos: {
                    small: null,
                    large: null
                },
                followed: false,
                location: {
                    city: 'Minsk',
                    country: 'Belarus'
                }
            },
            {
                id: 2,
                name: 'Petr',
                status: 'status',
                photos: {
                    small: null,
                    large: null
                },
                followed: true,
                location: {
                    city: 'Moscow',
                    country: 'Russia'
                }
            },
            {
                id: 3,
                name: 'Sveta',
                status: 'status',
                photos: {
                    small: null,
                    large: null
                },
                followed: false,
                location: {
                    city: 'Minsk',
                    country: 'Belarus'
                }
            }
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: false,
        followingInProgress: []
    }
})

test('the property followed should be changed to true in the correct object', () => {

    const endState = usersReducer(statrtState, followSuccess(1))

    expect(endState.users[0].followed).toBeTruthy()
    expect(endState.users[1].followed).toBeTruthy()
    expect(endState.users[2].followed).toBeFalsy()
})

test('the property followed should be changed to false in the correct object', () => {

    const endState = usersReducer(statrtState, unfollowSuccess(2))

    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeFalsy()
    expect(endState.users[2].followed).toBeFalsy()
})

test('users should be changed', () => {

    const users = [
        {
            id: 4,
            name: 'Pavel',
            status: 'status',
            photos: {
                small: null,
                large: null
            },
            followed: false,
            location: {
                city: 'Minsk',
                country: 'Belarus'
            }
        },
        {
            id: 5,
            name: 'Ekaterina',
            status: 'status',
            photos: {
                small: null,
                large: null
            },
            followed: true,
            location: {
                city: 'Moscow',
                country: 'Russia'
            }
        },
        {
            id: 6,
            name: 'Olga',
            status: 'status',
            photos: {
                small: null,
                large: null
            },
            followed: true,
            location: {
                city: 'Moscow',
                country: 'Russia'
            }
        }
    ]

    const endState = usersReducer(statrtState, setUsers(users))

    expect(endState.users.length).toBe(3)
    expect(endState.users[0].id).toBe(4)
    expect(endState.users[1].id).toBe(5)
    expect(endState.users[2].id).toBe(6)
})