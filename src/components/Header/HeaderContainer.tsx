import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { logout } from "../../redux/auth-reducer";
import { RootStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderContainerType> {
  render() {
    return <Header {...this.props} />;
  }
}

const MapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
  login: state.auth.data.login,
});

type MapStateToPropsType = {
  isAuth: boolean;
  login: string | null;
};
type MapDispachToPropsType = {
  logout: () => void;
};

type HeaderContainerType = MapStateToPropsType & MapDispachToPropsType;

export default connect(MapStateToProps, { logout })(HeaderContainer);
