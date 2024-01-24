import { ThunkDispatch } from "redux-thunk";
import { getAuthUserData } from "./auth-reducer";
import { RootStateType } from "./redux-store";
import { AnyAction } from "redux";

const initialState: AppDataType = {
  initialized: false,
};

export const appReducer = (
  state: AppDataType = initialState,
  action: AppActionsType
) => {
  switch (action.type) {
    case "app/INITIALIZED-SUCCESS":
      return { ...state, initialized: true };
    default:
      return state;
  }
};

export const initializedSuccess = () =>
  ({ type: "app/INITIALIZED-SUCCESS" } as const);

export const initializeApp =
  () => (dispatch: ThunkDispatch<RootStateType, unknown, AnyAction>) => {
    dispatch(getAuthUserData()).then(() => dispatch(initializedSuccess()));
  };

type AppDataType = {
  initialized: boolean;
};
type AppActionsType = ReturnType<typeof initializedSuccess>;
