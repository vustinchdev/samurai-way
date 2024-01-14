import { AnyAction, Dispatch } from "redux";
import { authAPI } from "../api/api";
import { ThunkDispatch } from "redux-thunk";
import { RootStateType } from "./redux-store";

export type AuthDataType = {
  id: number | null;
  login: string | null;
  email: string | null;
};

type AuthType = {
  data: AuthDataType;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
  isAuth: boolean;
};

const initialState: AuthType = {
  data: {
    id: null,
    login: null,
    email: null,
  },
  messages: [],
  fieldsErrors: [],
  resultCode: 0,
  isAuth: false,
};

export const authReducer = (
  state: AuthType = initialState,
  action: ActionsType
): AuthType => {
  switch (action.type) {
    case "SET-USER-DATA":
      return {
        ...state,
        data: action.data,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
};

type ActionsType = SetUserData;

type SetUserData = ReturnType<typeof setAuthUserData>;

export const setAuthUserData = (data: AuthDataType, isAuth: boolean) => {
  return {
    type: "SET-USER-DATA",
    data,
    isAuth,
  } as const;
};

export const getAuthUserData = () => (dispatch: Dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(setAuthUserData(res.data.data, true));
    }
  });
};
export const login =
  (email: string, password: string, rememberMe: boolean) =>
  (dispatch: ThunkDispatch<RootStateType, unknown, AnyAction>) => {
    authAPI.login(email, password, rememberMe).then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(getAuthUserData());
      }
    });
  };
export const logout =
  () => (dispatch: ThunkDispatch<RootStateType, unknown, AnyAction>) => {
    authAPI.logout().then((res) => {
      if (res.data.resultCode === 0) {
        dispatch(
          setAuthUserData({ id: null, login: null, email: null }, false)
        );
      }
    });
  };
