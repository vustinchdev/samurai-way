import React, { ChangeEvent, useState } from "react";
import s from "./ProfileInfo.module.css";
import { Preloader } from "../../common/Preloader/Preloader";
import { ProfilePropsType } from "../Profile";
import { ProfileStatusWithHooks } from "./ProfileStatusWithHooks";
import userPhoto from "./../../../assets/images/user.png";
import { ProfileData } from "./ProfileData";
import { ProfileDataFormReduxForm } from "./ProfileDataForm";
import { ProfileResponse } from "../../../api/api";

export const ProfileInfo: React.FC<ProfilePropsType> = ({
  isOwner,
  profile,
  status,
  updateStatus,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData: ProfileResponse) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img
          src={profile.photos.large || userPhoto}
          className={s.defaultPhoto}
        />
        {isOwner && <input type="file" onChange={onMainPhotoSelected} />}
        {editMode ? (
          <ProfileDataFormReduxForm
            initialValues={profile}
            onSubmit={onSubmit}
            profile={profile}
          />
        ) : (
          <ProfileData
            profile={profile}
            isOwner={isOwner}
            goToEditMode={() => setEditMode(true)}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};
