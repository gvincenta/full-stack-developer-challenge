import React from 'react'
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap'
export default function (){
    return (  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/books">Infoxchange</Navbar.Brand>
    <Nav>
      <Nav.Link href="/books">Books</Nav.Link>
      <Nav.Link href="/authors">Authors</Nav.Link> 
    </Nav> 
  </Navbar>)
}