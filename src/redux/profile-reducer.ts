import { Dispatch } from "redux";
import { ProfilePageType } from "./store";
import { ProfileResponse, profileAPI } from "../api/api";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hello, how are you?", likesCount: 15 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  profile: null,
  status: "",
};

type ActionsType = AddPostACType | SetUserProfile | SetStatus | DeletePost;

export const profileReducer = (
  state = initialState,
  action: ActionsType
): ProfilePageType => {
  switch (action.type) {
    case "ADD-POST": {
      const newPost = {
        id: 5,
        message: action.newPost,
        likesCount: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
      };
    }
    case "SET-USER-PROFILE":
      return { ...state, profile: action.profile };
    case "SET-STATUS":
      return { ...state, status: action.status };
    case "DELETE-POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    default:
      return state;
  }
};

export type AddPostACType = ReturnType<typeof addPostAC>;

export const addPostAC = (newPost: string) => {
  return {
    type: "ADD-POST",
    newPost,
  } as const;
};

export type SetUserProfile = ReturnType<typeof setUserProfile>;

export const setUserProfile = (profile: ProfileResponse) =>
  ({ type: "SET-USER-PROFILE", profile } as const);

export type SetStatus = ReturnType<typeof setStatus>;
export const setStatus = (status: string) =>
  ({ type: "SET-STATUS", status } as const);

export type DeletePost = ReturnType<typeof deletePost>;
export const deletePost = (postId: number) =>
  ({ type: "DELETE-POST", postId } as const);
export const getUserProfile = (userId: string) => (dispatch: Dispatch) => {
  profileAPI.getProfile(userId).then((res) => {
    dispatch(setUserProfile(res.data));
  });
};

export const getStatus = (userId: string) => (dispatch: Dispatch) => {
  profileAPI.getStatus(userId).then((res) => {
    dispatch(setStatus(res.data));
  });
};

export const updateStatus = (status: string) => (dispatch: Dispatch) => {
  profileAPI.updateStatus(status).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  });
};
