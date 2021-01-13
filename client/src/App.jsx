import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Navbar from './Navbar'
import Books from './Books'

function App() {
  return (
    <>
        <Navbar/>
        <BrowserRouter>
            <Route path='/books'>
                <Books/>
            </Route>
        </BrowserRouter>
    </>
  );
}

export default App;
