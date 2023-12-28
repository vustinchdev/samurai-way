import React from "react";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import { UserType, follow, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching, unfollow, toggleFollowingInProgress } from "../../redux/users-reducer";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import { usersAPI } from "../../api/api";



export type MapStateType = {
    users: UserType[]
    pageSize: number
    totalUsersCount: number
    currentPage: number
    followingInProgress: number[]
}

type MapDispatchType = {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    setUsers: (users: UserType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setTotalUsersCount: (totalCount: number) => void
    toggleFollowingInProgress: (userId: number, isFetching: boolean) => void
}

class UsersContainer extends React.Component<UsersAPIComponentType> {

    componentDidMount() {
        this.props.toggleIsFetching(true)
        usersAPI.getUsers(this.props.currentPage, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
                this.props.setTotalUsersCount(data.totalCount)
            })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(pageNumber)
        usersAPI.getUsers(pageNumber, this.props.pageSize)
            .then(data => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(data.items)
            })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users
                users={this.props.users}
                pageSize={this.props.pageSize}
                totalUsersCount={this.props.totalUsersCount}
                currentPage={this.props.currentPage}
                followingInProgress={this.props.followingInProgress}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                onPageChanged={this.onPageChanged}
                toggleFollowingInProgress={this.props.toggleFollowingInProgress}
            />
        </>
    }
}

export type UsersAPIComponentType = MapDispatchType & MapStateType & {
    isFetching: boolean
    toggleIsFetching: (isFetching: boolean) => void
}

const mapStateToProps = (state: RootStateType) => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }
}

export default connect(mapStateToProps,
    { follow, unfollow, setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching, toggleFollowingInProgress })(UsersContainer)