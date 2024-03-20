import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css'; // Asegúrate de que la ruta sea correcta

const Pagination = ({ drivers, driversByname, driversPerPage, currentPage, pagination }) => {
   
const applyFilterForDriver = (driversByname !== undefined && driversByname >= 1);

// Calculo del número de páginas
const totalDrivers = applyFilterForDriver ? driversByname : drivers;
const pageNumber = Math.max(Math.ceil(totalDrivers / driversPerPage), 1);


const [activePage, setActivePage] = useState(currentPage);

// Genera un array de números de página basado en el número total de páginas
const pageNumbers = Array.from({ length: pageNumber }, (_, index) => index + 1);
    // Se ejecuta cada vez que currentPage cambia, actualizando el estado activePage con el nuevo valor de currentPage
    // Actualiza la página activa
    useEffect(() => {
        setActivePage(currentPage);
    }, [currentPage]);

    // Esta función se llama cuando se hace clic en un número de página. Despacha la acción pagination con el número de página seleccionado y actualiza el estado activePage con este número
    // Manejo del clic en la página
    const handlePageClick = (page) => {
        pagination(page);
        setActivePage(page);
    };

    // Se ejecuta cada vez que currentPage cambia, desplazando de manera suave
    // Efecto para desplazarse hacia la parte superior
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [currentPage]);

    // Funciones para ir a la primera y última página
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
                {pageNumbers.map((page) => (
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
