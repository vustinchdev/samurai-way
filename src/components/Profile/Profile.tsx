import React from "react";
import s from "./Profile.module.css";
import { ProfileInfo } from "./ProfileInfo/ProfileInfo";
import { MyPostsContainer } from "./MyPosts/MyPostsContainer";
import { ProfileResponse } from "../../api/api";

export type ProfilePropsType = {
  profile: ProfileResponse;
  status: string;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  updateStatus: (status: string) => void;
  saveProfile: (profile: ProfileResponse) => Promise<any>;
};

export const Profile: React.FC<ProfilePropsType> = (props) => {
  return (
    <main className={s.content}>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        savePhoto={props.savePhoto}
        updateStatus={props.updateStatus}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </main>
  );
};
