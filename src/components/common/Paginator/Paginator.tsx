import React from "react";
import styles from "./Paginator.module.css";

type PaginatorType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
};

export const Paginator: React.FC<PaginatorType> = ({
  currentPage,
  pageSize,
  totalUsersCount,
  onPageChanged,
}) => {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((p) => (
        <span
          className={currentPage === p ? styles.selectedPage : styles.page}
          onClick={() => onPageChanged(p)}
        >
          {p}
        </span>
      ))}
    </div>
  );
};
