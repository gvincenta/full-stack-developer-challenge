import React from 'react'
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import Navbar from './Navbar'
import Books from './Books'
import BookForm from './Books/Modal'

function App() {
  return (
    <>
        <Navbar/>
        <BrowserRouter>
            <Route exact path='/books' > 
             
                    <Books/> 
            </Route>
            <Route  path='/book/:id' > 
            <Books/>  
     </Route>
            
        </BrowserRouter>
    </>
  );
}

export default App;
