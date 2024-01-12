import React from "react";
import { addMessageAC } from "../../redux/dialogs-reducer";
import { Dialogs } from "./Dialogs";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import { Dispatch, compose } from "redux";
import { DialogsPageType } from "../../redux/store";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

type MapStatePropsType = {
  dialogsPage: DialogsPageType;
};

type MapDispatchPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

export type DialogsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    sendMessage: (newMessageBody) => dispatch(addMessageAC(newMessageBody)),
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
