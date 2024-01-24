import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user.png";
import { MapStateToPorpsType } from "./UsersContainer";
import { NavLink } from "react-router-dom";
import { Paginator } from "../common/Paginator/Paginator";

type UsersType = MapStateToPorpsType & {
  follow: (userId: number) => void;
  unfollow: (userId: number) => void;
  onPageChanged: (pageNumber: number) => void;
};

export const Users: React.FC<UsersType> = ({
  totalUsersCount,
  currentPage,
  pageSize,
  users,
  followingInProgress,
  follow,
  unfollow,
  onPageChanged,
}) => {
  return (
    <div>
      <Paginator
        totalUsersCount={totalUsersCount}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChanged={onPageChanged}
      />
      {users.map((u) => (
        <div key={u.id}>
          <span>
            <div>
              <NavLink to={"/profile/" + u.id}>
                <img
                  src={u.photos.small !== null ? u.photos.small : userPhoto}
                  className={styles.userPhoto}
                />
              </NavLink>
            </div>
            <div>
              {u.followed ? (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => unfollow(u.id)}
                >
                  Unfollow
                </button>
              ) : (
                <button
                  disabled={followingInProgress.some((id) => id === u.id)}
                  onClick={() => follow(u.id)}
                >
                  Follow
                </button>
              )}
            </div>
          </span>
          <span>
            <div>{u.name}</div>
            <div>{u.status}</div>
          </span>
        </div>
      ))}
    </div>
  );
};
