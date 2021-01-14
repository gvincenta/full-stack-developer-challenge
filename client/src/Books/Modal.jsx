import React, {useEffect, useState} from 'react'
import {CardColumns, DropdownButton, ButtonGroup, Dropdown, Form, FormControl, InputGroup, Button, Modal, Col, Row} from 'react-bootstrap'
import axios from 'axios'
import {TextField} from '@material-ui/core'
import Autocomplete from '../Autocomplete'
export default function({id}){
    const [book, setBook] = useState([])   

    // console.log('PROPS ARE', props)
    console.log('ID ARE', id)
    const [show, setShow] = useState(true);
    const [authorMode, setAuthorMode] = useState('Edit');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    useEffect(() => {
       if (id) {
        axios.get('/book',{params : {id }})
        .then(res =>{
            console.log('axios get specific book ', res)
            setBook(res.data)
        })
        .catch(e => {
            console.log('axios error', e)

        })
       }
        
    }, [id])

     
   
    return (
        <> 
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>View Book Details </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <h3> Book </h3>
  <Form.Group as={Row} >
    <Form.Label column sm="3">
      Name
    </Form.Label>
    <Col sm="7">
      <Form.Control  type="text" placeholder='Name' value={book.name}
        onChange={(e) => {
             
            setBook({...book, name:e.target.value  })
        }} />
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Form.Label column sm="3">
      ISBN
    </Form.Label>
    <Col sm="7">
      <Form.Control type="text" placeholder="ISBN"
       value={book.isbn}
       onChange={(e) => {
       
        setBook({...book, isbn:e.target.value  })
    }} />
    </Col>
  </Form.Group>
  <h3> Author   </h3>
  <Form.Group as={Row} >
    <Form.Label column sm="3">
      First Name
    </Form.Label>
    <Col sm="7">
      {/* <Form.Control  type="text" placeholder='First Name'
      value={book.author?.firstName}
      onChange={(e) => {
      
       setBook({...book, author: {...book.author, firstName: e.target.value } })
   }} /> */}
   <TextField
          size='small' 
          style={{ width: 300 }}
          variant="outlined"
          value={book.author?.firstName}
          onChange={(e) => {
          
           setBook({...book, author: {...book.author, firstName: e.target.value } })
       }}
        />
    </Col>
  </Form.Group>

  <Form.Group as={Row}>
    <Form.Label column sm="3">
    Last Name
    </Form.Label>
    <Col sm="7">
      {/* <Form.Control type="text" placeholder="Last Name" 
       value={book.author?.lastName}
       onChange={(e) => {
       
        setBook({...book, author: {...book.author, lastName: e.target.value } })
    }}/> */}
    <Autocomplete/>
    </Col>
  </Form.Group>
</Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
} 