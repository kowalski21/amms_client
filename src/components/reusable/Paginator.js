import { DOTS, useMyPagination } from "@/hooks/utils";
import React from "react";
import classNames from "classnames";
const Paginator = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
  className,
}) => {
  //   const {
  //     onPageChange,
  //     totalCount,
  //     siblingCount = 1,
  //     currentPage,
  //     pageSize,
  //     className,
  //   } = props;

  const paginationRange = useMyPagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const doNothing = () => {};

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul class={`pagination justify-content-end mb-0 ${className}`}>
      <li
        class={classNames("page-item", {
          disabled: currentPage === 1,
        })}
        onClick={currentPage === 1 ? doNothing : onPrevious}
      >
        <a class="page-link sc">Previous</a>
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li className="page-item dots sc">
              <a className="page-link">&#8230;</a>
            </li>
          );
        }
        return (
          <li
            key={pageNumber}
            className={classNames("page-item sc", {
              active: pageNumber === currentPage,
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            <a className="page-link">{pageNumber}</a>
          </li>
        );
      })}
      <li
        class={classNames("page-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={currentPage === lastPage ? doNothing : onNext}
      >
        <a class="page-link sc">Next</a>
      </li>
    </ul>
  );
};

export default Paginator;
