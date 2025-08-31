
import React from 'react';
import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pageCount, onPageChange }) => {
  if (pageCount <= 0) return null;
  return (
    <ReactPaginate
      pageCount={pageCount}
      forcePage={page - 1}
      onPageChange={selected => onPageChange(selected.selected + 1)}
      containerClassName={css.pagination}
      pageClassName={css.page}
      activeClassName={css.active}
      previousClassName={css.page}
      nextClassName={css.page}
      breakClassName={css.page}
      disabledClassName={css.disabled}
      previousLabel={"←"}
      nextLabel={"→"}
      breakLabel={"..."}
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
    />
  );
};

export default Pagination;
