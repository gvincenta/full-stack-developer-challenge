import React from "react";
import { Navbar, Nav} from "react-bootstrap";
/**
 * Navbar component.
 */
export default function NavbarHomepage() {
    return (
        <Navbar style={{ background: "#212121" }} variant="dark">
            <Navbar.Brand href="/books">Infoxchange</Navbar.Brand>
            <Nav>
                <Nav.Link
                    href="/books"
                     /* highlighted on /books/ and /book/:id*/
                    active={window.location.pathname.search("/book") !== -1}>
                    Books
                </Nav.Link>
                <Nav.Link
                    href="/authors"
                     /* highlighted on /authors/ and /author/:id*/
                    active={window.location.pathname.search("/author") !== -1}>
                    Authors
                </Nav.Link>
            </Nav>
        </Navbar>
    );
}
