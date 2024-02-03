import { Pagination } from "antd";
import React from "react";
import s from "./Paginator.module.css";
type PaginatorType = {
  totalItemsCount: number;
  pageSize: number;
  currentPage: number;
  portionSize?: number;
  onPageChanged: (pageNumber: number) => void;
};

export const Paginator: React.FC<PaginatorType> = ({
  currentPage,
  totalItemsCount,
  onPageChanged,
}) => (
  <div className={s.paginator}>
    <Pagination
      defaultCurrent={currentPage}
      total={totalItemsCount}
      onChange={onPageChanged}
      showSizeChanger={false}
      size="small"
    />
  </div>
);
