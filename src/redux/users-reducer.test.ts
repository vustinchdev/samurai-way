import { InitialStateType, followAC, setUsersAC, unfollowAC, usersReducer } from "./users-reducer";

let statrtState: InitialStateType

beforeEach(() => {
    statrtState = {
        users: [
            { id: 1, followed: false, fullName: 'Dima', status: 'status', location: { city: 'Minsk', country: 'Belarus' } },
            { id: 2, followed: true, fullName: 'Petr', status: 'status', location: { city: 'Moscow', country: 'Russia' } },
            { id: 3, followed: false, fullName: 'Sveta', status: 'status', location: { city: 'Minsk', country: 'Belarus' } }
        ]
    }
})

test('the property followed should be changed to true in the correct object', () => {

    const endState = usersReducer(statrtState, followAC(1))

    expect(endState.users[0].followed).toBeTruthy()
    expect(endState.users[1].followed).toBeTruthy()
    expect(endState.users[2].followed).toBeFalsy()
})

test('the property followed should be changed to false in the correct object', () => {

    const endState = usersReducer(statrtState, unfollowAC(2))

    expect(endState.users[0].followed).toBeFalsy()
    expect(endState.users[1].followed).toBeFalsy()
    expect(endState.users[2].followed).toBeFalsy()
})

test('users should be added to the original array', () => {

    const users = [
        { id: 4, followed: false, fullName: 'Pavel', status: 'status', location: { city: 'Minsk', country: 'Belarus' } },
        { id: 5, followed: true, fullName: 'Ekaterina', status: 'status', location: { city: 'Moscow', country: 'Russia' } }
    ]

    const endState = usersReducer(statrtState, setUsersAC(users))

    expect(endState.users.length).toBe(5)
    expect(endState.users[3].id).toBe(4)
    expect(endState.users[4].id).toBe(5)
})