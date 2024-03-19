import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css'; // Asegúrate de que la ruta sea correcta

const Pagination = ({ drivers, driversPerPage, currentPage, pagination }) => {

  //calculo el numero de paginas:
    const pageNumber = Math.ceil(drivers / driversPerPage);
    const [activePage, setActivePage] = useState(currentPage);

    //se ejecuta cada vez que currentPage cambia, actualizando elestado activePage con el nuevo valor de currentPage
    //actualiza la pagina activa:
    useEffect(() => {
        setActivePage(currentPage);
    }, [currentPage]);

    //esta funcion se llama cuando se hace clic en un numero de pagina. Despacha la accion pagination con el numero de pagina seleccionado y actualiza el estado activePage con este numero
    //manejo del clic en la pagina:
    const handlePageClick = (page) => {
        pagination(page);
        setActivePage(page);
    };

    //se ejecuta cada vez que currentPage cambia,desplazando de manera suave
    //efecto para desplazarse hacia la parte superior
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

    //funciones para ir a la primera y ultima pagina
    const goToFirstPage = () => {
        if (currentPage !== 1) {
            pagination(1);
            setActivePage(1);
        }
    };

    const goToLastPage = () => {
        if (currentPage !== pageNumber) {
            pagination(pageNumber);
            setActivePage(pageNumber);
        }
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
