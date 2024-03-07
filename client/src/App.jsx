import {Route} from "react-router-dom";
import { BrowserRouter,Switch } from 'react-router-dom';
import './App.css'
import Landing from './componentes/landing/Landing';
import Home from "./componentes/home/Home";
import Nav from "./componentes/nav/Nav";
import Detail from "./componentes/detail/detail";
import Form from "./componentes/form/Form";

function App() {

  return (
    <BrowserRouter>
    <div className='App'>
      <Switch>
        <Route exact path='/' Component={Landing}/>
        <Route path='/' render={({location})=>{if (location.pathname !== '/'){
          return (
            <>
            <Nav/>
            <Route exact path="/home" Component={Home}/>
            <Route exact path="/drivers/:id" Component={Detail}/>
            <Route exact path="/form" Component={Form}/>
            <Route exact path="/form/:id" Component={Form}/>
            </>
          )
        }
        }
        }
        />
      </Switch>
    </div>
    </BrowserRouter>
  )
}

export default App
