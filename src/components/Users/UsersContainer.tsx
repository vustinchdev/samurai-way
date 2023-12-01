
import { Users } from "./Users";

import { connect } from "react-redux";
import { Dispatch } from 'redux'
import { RootStateType } from "../../redux/redux-store";
import { UserType, followAC, setUsersAC, unfollowAC } from "../../redux/users-reducer";

type MapStateType = {
    users: UserType[]
}

type MapDispatchType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
}

export type UsersType = MapStateType & MapDispatchType

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId))
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: UserType[]) => {
            dispatch(setUsersAC(users))
        }
    }
}


export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users)