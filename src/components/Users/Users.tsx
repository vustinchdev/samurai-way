import React from "react";
import { MapStateToPorpsType } from "./UsersContainer";
import { Paginator } from "../common/Paginator/Paginator";
import { User } from "./User";

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
        <User
          key={u.id}
          user={u}
          followingInProgress={followingInProgress}
          follow={follow}
          unfollow={unfollow}
        />
      ))}
    </div>
  );
};
