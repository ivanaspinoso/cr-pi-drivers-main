import React from 'react'
import {Link} from "react-router-dom";

const Nav = () => {
  return (
    <div>
      <nav>
        <Link to="/">
          <button> Landing </button>
        </Link>
        <Link to="/home">
          <button>
            Home
          </button>
        </Link>
        <Link to="/form">
          <button>Crear un nuevo conductor</button>
        </Link>
      </nav>
    </div>
  )
}

export default Nav
