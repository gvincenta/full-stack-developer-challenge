import React, { useMemo } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Navbar from "./Navbar";
import Books from "./Books";
import Authors from "./Authors";

import "./App.css";

function App() {
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
                <Route exact path="/books">
                    <Books />
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
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
