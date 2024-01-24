import { authAPI } from "../api/api";
import { AppDispatch } from "./redux-store";
import { stopSubmit } from "redux-form";

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
    case "auth/SET-USER-DATA":
      return {
        ...state,
        data: action.data,
        isAuth: action.isAuth,
      };
    default:
      return state;
  }
};

export const setAuthUserData = (data: AuthDataType, isAuth: boolean) =>
  ({ type: "auth/SET-USER-DATA", data, isAuth } as const);

export const getAuthUserData = () => async (dispatch: AppDispatch) => {
  const res = await authAPI.me();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserData(res.data.data, true));
  }
};
export const login =
  (email: string, password: string, rememberMe: boolean) =>
  async (dispatch: AppDispatch) => {
    const res = await authAPI.login(email, password, rememberMe);
    if (res.data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      let message =
        res.data.messages.length > 0 ? res.data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  };
export const logout = () => async (dispatch: AppDispatch) => {
  const res = await authAPI.logout();
  if (res.data.resultCode === 0) {
    dispatch(setAuthUserData({ id: null, login: null, email: null }, false));
  }
};

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
type ActionsType = ReturnType<typeof setAuthUserData>;
