import { Dispatch } from "redux";
import { UserResponse, usersAPI } from "../api/api";

export type UsersStateType = {
  users: UserResponse[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};

let initialState: UsersStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

type ActionsType =
  | FollowACType
  | UnfollowACType
  | SetUsersACType
  | SetCurrentPageACType
  | SetTotalUsersCountACType
  | SetIsFetching
  | ToggleFollowingInProgress;

export const usersReducer = (
  state: UsersStateType = initialState,
  action: ActionsType
): UsersStateType => {
  switch (action.type) {
    case "FOLLOW":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: true } : u
        ),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.userId ? { ...u, followed: false } : u
        ),
      };
    case "SET-USERS":
      return {
        ...state,
        users: action.users,
      };
    case "SET-CURRENT-PAGE":
      return {
        ...state,
        currentPage: action.currentPage,
      };
    case "SET-TOTAL-USERS-COUNT":
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    case "TOGGLE-IS-FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "TOGGLE-FOLLOWING-IN-PROGRESS":
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

type FollowACType = ReturnType<typeof followSuccess>;

export const followSuccess = (userId: number) =>
  ({ type: "FOLLOW", userId } as const);

type UnfollowACType = ReturnType<typeof unfollowSuccess>;

export const unfollowSuccess = (userId: number) =>
  ({ type: "UNFOLLOW", userId } as const);

type SetUsersACType = ReturnType<typeof setUsers>;

export const setUsers = (users: UserResponse[]) =>
  ({ type: "SET-USERS", users } as const);

type SetCurrentPageACType = ReturnType<typeof setCurrentPage>;

export const setCurrentPage = (currentPage: number) =>
  ({ type: "SET-CURRENT-PAGE", currentPage } as const);

type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>;

export const setTotalUsersCount = (totalUsersCount: number) =>
  ({ type: "SET-TOTAL-USERS-COUNT", totalUsersCount } as const);

type SetIsFetching = ReturnType<typeof toggleIsFetching>;

export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: "TOGGLE-IS-FETCHING", isFetching } as const);

type ToggleFollowingInProgress = ReturnType<typeof toggleFollowingInProgress>;

export const toggleFollowingInProgress = (
  userId: number,
  isFetching: boolean
) => ({ type: "TOGGLE-FOLLOWING-IN-PROGRESS", userId, isFetching } as const);

export const getUsers =
  (page: number, pageSize: number) => (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    usersAPI.getUsers(page, pageSize).then((data) => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };

export const follow = (userId: number) => (dispatch: Dispatch) => {
  dispatch(toggleFollowingInProgress(userId, true));
  usersAPI.follow(userId).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(followSuccess(userId));
    }
    dispatch(toggleFollowingInProgress(userId, false));
  });
};

export const unfollow = (userId: number) => (dispatch: Dispatch) => {
  dispatch(toggleFollowingInProgress(userId, true));
  usersAPI.unfollow(userId).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(unfollowSuccess(userId));
    }
    dispatch(toggleFollowingInProgress(userId, false));
  });
};
