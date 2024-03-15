import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css'; // Asegúrate de que la ruta sea correcta

const Pagination = ({drivers, driversPerPage, currentPage, pagination}) => {
 const pageNumber = Math.ceil(drivers / driversPerPage);
 const [activePage, setActivePage] = useState(currentPage);

 useEffect(() => {
    setActivePage(currentPage);
 }, [currentPage]);

 const handlePageClick = (page) => {
    pagination(page);
    setActivePage(page);
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

 // Genera un array de números de página
 const pageNumbers = Array.from({ length: pageNumber }, (_, index) => index + 1);

 // Divide el array de números de página en dos partes
 const half = Math.ceil(pageNumbers.length / 2);
 const firstHalf = pageNumbers.slice(0, half);
 const secondHalf = pageNumbers.slice(half);

 return (
    <nav className={styles.Pagination}>
      <ul className={styles.PageNumbers}>
        <li>
          <button onClick={goToFirstPage}
            disabled={currentPage === 1}
            className={`${styles.PageNumber} ${activePage === 1 ? styles.active : ''}`}
          >          
            First
          </button>
        </li>
        <li>
          <button onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className={`${styles.PageNumber} ${activePage === currentPage - 1 ? styles.active : ''}`}
          >
            Prev
          </button>
        </li>
        {/* Primera hilera de botones de números de página */}
        {firstHalf.map((page, index) => (
 <li key={page}>
    <button onClick={() => handlePageClick(page)}
      className={`${styles.PageNumber} ${activePage === page ? styles.active : ''} ${index < firstHalf.length - 1 ? styles.firstRow : ''}`}
    >
      {page}
    </button>
 </li>
))}
        {/* Segunda hilera de botones de números de página */}
        {secondHalf.map((page) => (
          <li key={page}>
            <button onClick={() => handlePageClick(page)}
              className={`${styles.PageNumber} ${activePage === page ? styles.active : ''}`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === pageNumber}
            className={`${styles.PageNumber} ${activePage === currentPage + 1 ? styles.active : ''}`}
          >
            Next
          </button>
        </li>
        <li>
          <button onClick={goToLastPage}
            disabled={currentPage === pageNumber}
            className={`${styles.PageNumber} ${activePage === pageNumber ? styles.active : ''}`}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
 );
};

export default Pagination;
