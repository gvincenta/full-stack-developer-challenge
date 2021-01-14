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
import Authors from './Authors'


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
            <Route exact path='/authors' > 
             
                    <Authors/> 
            </Route>
            <Route  path='/author/:id' > 
              <Authors/>  
            </Route>
            
        </BrowserRouter>
    </>
  );
}

export default App;
