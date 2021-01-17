import React, { useMemo } from "react";
import { BrowserRouter, Switch, Route, Link, Redirect } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./Navbar";
import Books from "./Books";
import Authors from "./Authors";
import NotFound from './NotFound'
import "./App.css";
/**
 * entry point of the web-app.
 */
function App() {
    //MUI theme setup.
    const theme = useMemo(
        () =>
            createMuiTheme({
                typography: {
                    button: {
                        textTransform: "none"
                    }
                },
                palette: {
                    type: "dark",
                    primary: {
                        main: "#AB7742"
                    }
                }
            }),
        []
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Navbar />
            <BrowserRouter>
              <Switch> 
                <Route exact path="/books">
                    <Books />
                </Route>
                <Route exact path="/">
                  <Redirect to="/books" />
                </Route> 
                 
                <Route path="/book/:id">
                    <Books />
                </Route>
                <Route exact path="/authors">
                    <Authors />
                </Route>
                <Route path="/author/:id">
                    <Authors />
                </Route>
                <Route path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
