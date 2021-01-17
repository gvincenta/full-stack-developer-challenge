import React from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
/**
 * Navbar component.
 */
export default function() {
    return (
        <Navbar style={{ background: "#212121" }} variant="dark">
            <Navbar.Brand href="/books">Infoxchange</Navbar.Brand>
            <Nav>
                <Nav.Link
                    href="/books"
                    active={window.location.pathname.search("/book") !== -1}>
                    Books
                </Nav.Link>
                <Nav.Link
                    href="/authors"
                    active={window.location.pathname.search("/author") !== -1}>
                    Authors
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
