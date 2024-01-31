import { ProfilePageType } from "./store";
import { Photos, ProfileResponse, profileAPI } from "../api/api";
import { AppDispatch, RootStateType } from "./redux-store";
import { stopSubmit } from "redux-form";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hello, how are you?", likesCount: 15 },
    { id: 2, message: "It's my first post", likesCount: 20 },
  ],
  profile: {
    aboutMe: "",
    contacts: {
      facebook: "",
      github: "",
      instagram: "",
      mainLink: "",
      twitter: "",
      vk: "",
      website: "",
      youtube: "",
    },
    fullName: "",
    lookingForAJob: false,
    lookingForAJobDescription: "",
    photos: {
      large: null,
      small: null,
    },
    userId: 2,
  },
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
    case "profile/SAVE-PHOTO-SUCCESS":
      return { ...state, profile: { ...state.profile, photos: action.photos } };
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
export const setPhotoSuccess = (photos: Photos) =>
  ({ type: "profile/SAVE-PHOTO-SUCCESS", photos } as const);

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
export const savePhoto = (file: File) => async (dispatch: AppDispatch) => {
  const res = await profileAPI.savePhoto(file);
  if (res.data.resultCode === 0) {
    dispatch(setPhotoSuccess(res.data.data.photos));
  }
};
export const saveProfile =
  (profile: ProfileResponse) =>
  async (dispatch: AppDispatch, getState: () => RootStateType) => {
    const userId = getState().auth.data.id;
    const res = await profileAPI.saveProfile(profile);
    if (res.data.resultCode === 0) {
      dispatch(getUserProfile(String(userId)));
    } else {
      dispatch(stopSubmit("edit-profile", { _error: res.data.messages[0] }));
      return Promise.reject(res.data.messages[0]);
    }
  };

export type AddPostACType = ReturnType<typeof addPostAC>;
type ActionsType =
  | AddPostACType
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setStatus>
  | ReturnType<typeof deletePost>
  | ReturnType<typeof setPhotoSuccess>;
