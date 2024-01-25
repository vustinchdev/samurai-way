import React, { useState } from "react";
import styles from "./Paginator.module.css";

type PaginatorType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  portionSize?: number;
  onPageChanged: (pageNumber: number) => void;
};

export const Paginator: React.FC<PaginatorType> = ({
  currentPage,
  pageSize,
  totalItemsCount,
  portionSize = 10,
  onPageChanged,
}) => {
  const pagesCount = Math.ceil(totalItemsCount / pageSize);
  const pages = [];

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const portionCount = Math.ceil(pagesCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div className={styles.paginator}>
      {portionNumber > 1 && (
        <button onClick={() => setPortionNumber(portionNumber - 1)}>
          prev
        </button>
      )}
      {pages
        .filter(
          (p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
        )
        .map((p) => (
          <span
            className={currentPage === p ? styles.selectedPage : styles.page}
            onClick={() => onPageChanged(p)}
          >
            {p}
          </span>
        ))}
      {portionCount > portionNumber && (
        <button onClick={() => setPortionNumber(portionNumber + 1)}>
          next
        </button>
      )}
    </div>
  );
};
