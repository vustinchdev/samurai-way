import React, { ChangeEvent } from "react";
import s from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfilePropsType } from "../Profile";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.png";

export const ProfileInfo: React.FC<ProfilePropsType> = ({
  isOwner,
  profile,
  status,
  updateStatus,
  savePhoto,
}) => {
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          className={s.defaultPhoto}
        />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        <div>{profile.fullName}</div>
        <div>{profile.aboutMe}</div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};
