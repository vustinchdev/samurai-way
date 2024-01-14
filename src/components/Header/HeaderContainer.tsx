import React from "react";
import { Header } from "./Header";
import { connect } from "react-redux";
import { getAuthUserData, logout } from "../../redux/auth-reducer";
import { RootStateType } from "../../redux/redux-store";

class HeaderContainer extends React.Component<HeaderContainerType> {
  componentDidMount() {
    this.props.getAuthUserData();
  }

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
  getAuthUserData: () => void;
  logout: () => void;
};

type HeaderContainerType = MapStateToPropsType & MapDispachToPropsType;

export default connect(MapStateToProps, { getAuthUserData, logout })(
  HeaderContainer
);
