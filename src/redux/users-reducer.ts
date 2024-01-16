import { Dispatch } from "redux";
import { usersAPI } from "../api/api";

type UserLocationType = {
  city: string;
  country: string;
};

export type UserType = {
  id: number;
  name: string;
  status: string;
  photos: {
    small: null | string;
    large: null | string;
  };
  followed: boolean;
  location: UserLocationType;
};

export type UsersStateType = {
  users: UserType[];
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
          u.id === action.payload.userId ? { ...u, followed: true } : u
        ),
      };
    case "UNFOLLOW":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.userId ? { ...u, followed: false } : u
        ),
      };
    case "SET-USERS":
      return {
        ...state,
        users: action.payload.users,
      };
    case "SET-CURRENT-PAGE":
      return {
        ...state,
        currentPage: action.payload.currentPage,
      };
    case "SET-TOTAL-USERS-COUNT":
      return {
        ...state,
        totalUsersCount: action.payload.totalUsersCount,
      };
    case "TOGGLE-IS-FETCHING":
      return {
        ...state,
        isFetching: action.payload.isFetching,
      };
    case "TOGGLE-FOLLOWING-IN-PROGRESS":
      return {
        ...state,
        followingInProgress: action.payload.isFetching
          ? [...state.followingInProgress, action.payload.userId]
          : state.followingInProgress.filter(
              (id) => id !== action.payload.userId
            ),
      };
    default:
      return state;
  }
};

type FollowACType = ReturnType<typeof followSuccess>;

export const followSuccess = (userId: number) => {
  return {
    type: "FOLLOW",
    payload: {
      userId,
    },
  } as const;
};

type UnfollowACType = ReturnType<typeof unfollowSuccess>;

export const unfollowSuccess = (userId: number) => {
  return {
    type: "UNFOLLOW",
    payload: {
      userId,
    },
  } as const;
};

type SetUsersACType = ReturnType<typeof setUsers>;

export const setUsers = (users: UserType[]) => {
  return {
    type: "SET-USERS",
    payload: {
      users,
    },
  } as const;
};

type SetCurrentPageACType = ReturnType<typeof setCurrentPage>;

export const setCurrentPage = (currentPage: number) => {
  return {
    type: "SET-CURRENT-PAGE",
    payload: {
      currentPage,
    },
  } as const;
};

type SetTotalUsersCountACType = ReturnType<typeof setTotalUsersCount>;

export const setTotalUsersCount = (totalUsersCount: number) => {
  return {
    type: "SET-TOTAL-USERS-COUNT",
    payload: {
      totalUsersCount,
    },
  } as const;
};

type SetIsFetching = ReturnType<typeof toggleIsFetching>;

export const toggleIsFetching = (isFetching: boolean) => {
  return {
    type: "TOGGLE-IS-FETCHING",
    payload: {
      isFetching,
    },
  } as const;
};

type ToggleFollowingInProgress = ReturnType<typeof toggleFollowingInProgress>;

export const toggleFollowingInProgress = (
  userId: number,
  isFetching: boolean
) => {
  return {
    type: "TOGGLE-FOLLOWING-IN-PROGRESS",
    payload: {
      userId,
      isFetching,
    },
  } as const;
};

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
