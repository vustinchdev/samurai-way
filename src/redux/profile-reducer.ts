import { ProfilePageType } from "./store";
import { ProfileResponse, profileAPI } from "../api/api";
import { AppDispatch } from "./redux-store";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hello, how are you?", likesCount: 15 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  profile: null,
  status: "",
};

export const profileReducer = (
  state = initialState,
  action: ActionsType
): ProfilePageType => {
  switch (action.type) {
    case "profile/ADD-POST": {
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
    case "profile/SET-USER-PROFILE":
      return { ...state, profile: action.profile };
    case "profile/SET-STATUS":
      return { ...state, status: action.status };
    case "profile/DELETE-POST":
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    default:
      return state;
  }
};

export const addPostAC = (newPost: string) =>
  ({ type: "profile/ADD-POST", newPost } as const);
export const setUserProfile = (profile: ProfileResponse) =>
  ({ type: "profile/SET-USER-PROFILE", profile } as const);
export const setStatus = (status: string) =>
  ({ type: "profile/SET-STATUS", status } as const);
export const deletePost = (postId: number) =>
  ({ type: "profile/DELETE-POST", postId } as const);

export const getUserProfile =
  (userId: string) => async (dispatch: AppDispatch) => {
    const res = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(res.data));
  };
export const getStatus = (userId: string) => async (dispatch: AppDispatch) => {
  const res = await profileAPI.getStatus(userId);
  dispatch(setStatus(res.data));
};
export const updateStatus =
  (status: string) => async (dispatch: AppDispatch) => {
    const res = await profileAPI.updateStatus(status);
    if (res.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };

export type AddPostACType = ReturnType<typeof addPostAC>;
type ActionsType =
  | AddPostACType
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof deletePost>;
