import React from "react";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  follow,
  setCurrentPage,
  unfollow,
  getUsers,
} from "../../redux/users-reducer";
import { Users } from "./Users";
import { Preloader } from "../common/Preloader/Preloader";
import { compose } from "redux";
import {
  getCurrentPageSelector,
  getFollowingInProgressSelector,
  getIsFetchingSelector,
  getPageSizeSelector,
  getTotalUsersCountSelector,
  getUsersSelector,
} from "../../redux/users-selectors";
import { UserResponse } from "../../api/api";

export type MapStateToPorpsType = {
  users: UserResponse[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  followingInProgress: number[];
};

type MapDispatchType = {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  setCurrentPage: (pageNumber: number) => void;
  getUsers: (currentPage: number, pageSize: number) => void;
};

class UsersContainer extends React.Component<UsersAPIComponentType> {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
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
    );
  }
}

export type UsersAPIComponentType = MapDispatchType &
  MapStateToPorpsType & {
    isFetching: boolean;
  };

const mapStateToProps = (state: RootStateType) => {
  return {
    users: getUsersSelector(state),
    pageSize: getPageSizeSelector(state),
    totalUsersCount: getTotalUsersCountSelector(state),
    currentPage: getCurrentPageSelector(state),
    isFetching: getIsFetchingSelector(state),
    followingInProgress: getFollowingInProgressSelector(state),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    getUsers,
  })
)(UsersContainer);
