import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./User.module.css";
import userPhoto from "../../assets/images/user.png";
import { UserResponse } from "../../api/api";

type UserType = {
  user: UserResponse;
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  followingInProgress: number[];
};

export const User: React.FC<UserType> = ({
  user,
  followingInProgress,
  follow,
  unfollow,
}) => {
  console.log(user);
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              src={user.photos.small !== null ? user.photos.small : userPhoto}
              className={styles.userPhoto}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => unfollow(user.id)}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => follow(user.id)}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <div>{user.name}</div>
        <div>{user.status}</div>
      </span>
    </div>
  );
};
