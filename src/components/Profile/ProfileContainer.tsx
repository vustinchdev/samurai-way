import React from "react";
import { Profile } from "./Profile";
import { connect } from "react-redux";
import { RootStateType } from "../../redux/redux-store";
import {
  setUserProfile,
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileResponse } from "../../api/api";

type MapStateToPropsType = {
  profile: ProfileResponse;
  status: string;
  authorizedUserId: number | null;
  isAuth: boolean;
};

type MapDispatchToPropsType = {
  setUserProfile: (profile: ProfileResponse) => void;
  getUserProfile: (userId: string) => void;
  getStatus: (userId: string) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileResponse) => Promise<any>;
};

type ProfileContainerType = MapStateToPropsType & MapDispatchToPropsType;

type PathParamsType = {
  userId: string;
};

type PropsType = RouteComponentProps<PathParamsType> & ProfileContainerType;

class ProfileContainer extends React.Component<PropsType> {
  refreshProfile() {
    let userId = this.props.match.params.userId;
    if (!userId) {
      userId = String(this.props.authorizedUserId);
      if (!userId) {
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userId);
    this.props.getStatus(userId);
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>) {
    if (this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile();
    }
  }

  render() {
    return (
      <Profile
        isOwner={!this.props.match.params.userId}
        profile={this.props.profile}
        status={this.props.status}
        updateStatus={this.props.updateStatus}
        savePhoto={this.props.savePhoto}
        saveProfile={this.props.saveProfile}
      />
    );
  }
}

const mapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.data.id,
  isAuth: state.auth.isAuth,
});

export default compose<React.ComponentType>(
  connect(mapStateToProps, {
    setUserProfile,
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
