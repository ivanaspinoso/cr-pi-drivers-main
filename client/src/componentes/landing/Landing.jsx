import { Link } from "react-router-dom"

const Landing = () => {
  return (
    <div>
      <h1>Bienvenido a mi Driver App</h1>
      <Link to="/home">
        <button>Enter</button> 
        </Link>
    </div>
  )
}

export default Landing
