import React from "react";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { News } from "./components/News/News";
import { Music } from "./components/Music/Music";
import { Settings } from "./components/Settings/Settings";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import { connect } from "react-redux";
import { compose } from "redux";
import { initializeApp } from "./redux/app-reducer";
import { Preloader } from "./components/common/Preloader/Preloader";
import { RootStateType } from "./redux/redux-store";
import { withSuspense } from "./hoc/withSuspense";
import { ErrorPage } from "./components/common/ErrorPage/ErrorPage";

const DialogsContainer = React.lazy(
  () => import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(
  () => import("./components/Profile/ProfileContainer")
);

class App extends React.Component<AppType> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert("Some error occured");
  };
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div>
        <HeaderContainer />
        <div className="app-wrapper">
          <Navbar />
          <div className="app-wrapper-content">
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/profile" />} />
              <Route
                path="/profile/:userId?"
                render={withSuspense(ProfileContainer)}
              />
              <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
              <Route path="/users" render={() => <UsersContainer />} />
              <Route path="/login" render={() => <Login />} />
              <Route path="/news" component={News} />
              <Route path="/music" component={Music} />
              <Route path="/settings" component={Settings} />
              <Route path="*" render={() => <ErrorPage />} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

type MapStateToPropsType = {
  initialized: boolean;
};
type MapDispatchToPropsType = {
  initializeApp: () => void;
};
type AppType = MapDispatchToPropsType & MapStateToPropsType;

const MapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  initialized: state.app.initialized,
});

export default compose<React.FC>(
  withRouter,
  connect(MapStateToProps, { initializeApp })
)(App);
