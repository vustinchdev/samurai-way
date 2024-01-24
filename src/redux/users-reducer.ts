import { UserResponse, usersAPI } from "../api/api";
import { AppDispatch } from "./redux-store";

let initialState: UsersStateType = {
  users: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [],
};

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

export const followSuccess = (userId: number) =>
  ({ type: "FOLLOW", userId } as const);
export const unfollowSuccess = (userId: number) =>
  ({ type: "UNFOLLOW", userId } as const);
export const setUsers = (users: UserResponse[]) =>
  ({ type: "SET-USERS", users } as const);
export const setCurrentPage = (currentPage: number) =>
  ({ type: "SET-CURRENT-PAGE", currentPage } as const);
export const setTotalUsersCount = (totalUsersCount: number) =>
  ({ type: "SET-TOTAL-USERS-COUNT", totalUsersCount } as const);
export const toggleIsFetching = (isFetching: boolean) =>
  ({ type: "TOGGLE-IS-FETCHING", isFetching } as const);
export const toggleFollowingInProgress = (
  userId: number,
  isFetching: boolean
) => ({ type: "TOGGLE-FOLLOWING-IN-PROGRESS", userId, isFetching } as const);

export const getUsers =
  (page: number, pageSize: number) => async (dispatch: AppDispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    const data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
export const follow = (userId: number) => async (dispatch: AppDispatch) => {
  dispatch(toggleFollowingInProgress(userId, true));
  const res = await usersAPI.follow(userId);
  if (res.data.resultCode === 0) {
    dispatch(followSuccess(userId));
  }
  dispatch(toggleFollowingInProgress(userId, false));
};
export const unfollow = (userId: number) => async (dispatch: AppDispatch) => {
  dispatch(toggleFollowingInProgress(userId, true));
  const res = await usersAPI.unfollow(userId);
  if (res.data.resultCode === 0) {
    dispatch(unfollowSuccess(userId));
  }
  dispatch(toggleFollowingInProgress(userId, false));
};

export type UsersStateType = {
  users: UserResponse[];
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: number[];
};
type ActionsType =
  | ReturnType<typeof followSuccess>
  | ReturnType<typeof unfollowSuccess>
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingInProgress>;
