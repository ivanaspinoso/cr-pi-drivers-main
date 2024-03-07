import React from 'react'
import { useEffect } from 'react'

const Pagination = ({drivers, driversPerPage,currentPage,pagination}) => {
  const pageNumber=Math.ceil(drivers/driversPerPage)

  const handlePrevClick=()=>{
    if(currentPage>1){
      pagination(currentPage -1)
    }
  }

  const handleNextClick = ()=>{
    if (currentPage < pageNumber){
      pagination(currentPage + 1)
    }
  }

  useEffect(()=>{
    window.scrollTo({
      top:0,
      behavior: "smooth",
    })
  },[currentPage])

  const goToFirstPage =()=>{
    pagination(1)
  };

  const goToLastPage=()=>{
    pagination(pageNumber)
  };

  return (
    <nav>
      <ul>
        <li>
          <button onClick={goToFirstPage}
          disabled={currentPage===1}
          >
            First
          </button>
        </li>
        <li>
          <button onClick={handlePrevClick}
          disabled={currentPage===1}
          >
            Prev
          </button>
        </li>
        <li>
          <button onClick={handleNextClick}
          disabled={currentPage===pageNumber}
          >
            Next
          </button>
        </li>
        <li>
          <button onClick={goToLastPage}
          disabled={currentPage===pageNumber}
          >
            Last
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Pagination
