import { ThunkDispatch } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { RootStateType } from "./redux-store";
import { AnyAction } from "redux";

type AppDataType = {
  initialized: boolean;
};

const initialState: AppDataType = {
  initialized: false,
};

type AppActionsType = ReturnType<typeof initializedSuccess>;

export const appReducer = (
  state: AppDataType = initialState,
  action: AppActionsType
) => {
  switch (action.type) {
    case "INITIALIZED-SUCCESS":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializedSuccess = () =>
  ({ type: "INITIALIZED-SUCCESS" } as const);

export const initializeApp =
  () => (dispatch: ThunkDispatch<RootStateType, unknown, AnyAction>) => {
    dispatch(getAuthUserData()).then(() => dispatch(initializedSuccess()));
  };
