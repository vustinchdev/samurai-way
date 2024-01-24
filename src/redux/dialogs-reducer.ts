import { ActionsType, DialogsPageType } from "./store";

const initialState: DialogsPageType = {
  dialogs: [
    { id: 1, name: "Dima" },
    { id: 2, name: "Petr" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Viktor" },
    { id: 5, name: "Valera" },
  ],
  messages: [
    { id: 1, message: "hello" },
    { id: 2, message: "How are you?" },
    { id: 3, message: "hello" },
  ],
};

export const dialogsReducer = (
  state = initialState,
  action: ActionsType
): DialogsPageType => {
  switch (action.type) {
    case "dialogs/ADD-MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          { id: 4, message: action.newMessageBody },
        ],
      };
    default:
      return state;
  }
};

export const addMessageAC = (newMessageBody: string) =>
  ({ type: "dialogs/ADD-MESSAGE", newMessageBody } as const);

export type AddMessageACType = ReturnType<typeof addMessageAC>;
