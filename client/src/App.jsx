import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Landing from './componentes/landing/Landing';
import Home from "./componentes/home/Home";
import Nav from "./componentes/nav/Nav";
import Detail from "./componentes/detail/Detail";
import {Form} from "./componentes/form/Form";

function App() {
  return (
    <Router>
      <div className='App'>
         <Nav /> 
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/home' element={<Home />} />
          <Route path='/drivers/:id' element={<Detail />} />
          <Route path='/form' element={<Form />} />
          {/* <Route path='/form/:id' element={<Form />} /> */}
        </Routes>
      </div>
    </Router>
  );
}
export default App;
