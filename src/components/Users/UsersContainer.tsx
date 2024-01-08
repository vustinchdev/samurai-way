import React from "react";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
    UserType, follow, setCurrentPage, unfollow, getUsers
} from "../../redux/users-reducer";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";




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
    setCurrentPage: (pageNumber: number) => void
    getUsers: (currentPage: number, pageSize: number) => void
}

class UsersContainer extends React.Component<UsersAPIComponentType> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
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
            />
        </>
    }
}

export type UsersAPIComponentType = MapDispatchType & MapStateType & {
    isFetching: boolean
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



// export default withAuthRedirect(connect(mapStateToProps,
//     {
//         follow, unfollow,
//         setCurrentPage,
//         getUsers
//     })(UsersContainer))

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect(mapStateToProps,
        {
            follow, unfollow,
            setCurrentPage,
            getUsers
        }
    ))(UsersContainer)