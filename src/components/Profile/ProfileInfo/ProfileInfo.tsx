import React from "react";
import s from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfilePropsType } from "../Profile";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.png";

export const ProfileInfo: React.FC<ProfilePropsType> = ({
  profile,
  status,
  updateStatus,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || userPhoto} />
        <div>{profile.fullName}</div>
        <div>{profile.aboutMe}</div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};
