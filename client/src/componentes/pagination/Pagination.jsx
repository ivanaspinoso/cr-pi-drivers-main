import React, { useEffect } from 'react';
import styles from './Pagination.module.css'; // Asegúrate de que la ruta sea correcta

const Pagination = ({drivers, driversPerPage, currentPage, pagination}) => {
 const pageNumber = Math.ceil(drivers / driversPerPage);

 const handlePrevClick = () => {
    if (currentPage > 1) {
      pagination(currentPage - 1);
    }
 };

 const handleNextClick = () => {
    if (currentPage < pageNumber) {
      pagination(currentPage + 1);
    }
 };

 useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
 }, [currentPage]);

 const goToFirstPage = () => {
    pagination(1);
 };

 const goToLastPage = () => {
    pagination(pageNumber);
 };

 return (
    <nav className={styles.Pagination}>
      <ul className={styles.PageNumbers}>
        <li>
          <button onClick={goToFirstPage}
            disabled={currentPage === 1}
            className={styles.PageNumber}
          >
            First
          </button>
        </li>
        <li>
          <button onClick={handlePrevClick}
            disabled={currentPage === 1}
            className={styles.PageNumber}
          >
            Prev
          </button>
        </li>
        <li>
          <button onClick={handleNextClick}
            disabled={currentPage === pageNumber}
            className={styles.PageNumber}
          >
            Next
          </button>
        </li>
        <li>
          <button onClick={goToLastPage}
            disabled={currentPage === pageNumber}
            className={styles.PageNumber}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
 );
};

export default Pagination;
