import React, {useEffect, useState} from 'react'
import {  Form,  Col, Row, Dropdown, DropdownButton} from 'react-bootstrap'
import axios from 'axios'
import {TextField} from '@material-ui/core'
import Autocomplete from '../Autocomplete'
import Modal from '../Templates/Modal'

export default function(props){
  const {id, add} = props
  const [book, setBook] = useState([])  
  const [authors, setAuthors] = useState([])  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)
  const [authorMode, setAuthorMode] = useState( 'Assign Existing')
 
    const handleSubmit = async  (e) => {
      e.preventDefault();
      setLoading(true)
      setSuccess(null)
      setError(null)
      var createAuthorResponse = null; 
      
      /* for assigning existing authors, book has {author: authorID}
        for adding new author, book has {author: {firstName, lastName}}  */ 
      var author = book.author; 

      if (authorMode === 'Add New'){
        
        createAuthorResponse = await axios.post('author', book.author)
        console.log('CREATE AUTHOR', createAuthorResponse.data)
        author =  createAuthorResponse.data._id
      }
    
      console.log('SUBMITTING THIS DATA',  {...book, author  })
      axios.post('/book', {...book, author  })
      .then((res) => {
          console.log('SUBMITTED', res)
          setTimeout(() => {
              setLoading(false);
              setSuccess(true);
          }, 1500)
          
      })
      .catch( (e) => {
          console.log('ERROR', e)
          setTimeout(() => {
              setLoading(false);
              setError(true);
          }, 1500)

      })
      
  } 
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
    useEffect(() => {
      if (authorMode === 'Assign Existing') {
       axios.get('/authors')
       .then(res =>{
           console.log('axios get all authors ', res)
           setAuthors(res.data)
       })
       .catch(e => {
           console.log('axios error', e)

       })
      }
       
   }, [authorMode])
     
   
    return (
      <>
        <Modal
        {...props} 
        loading={loading}
        success={success}
        error={error}
        fetch='/book'
        handleSubmit={add && handleSubmit}
        title={id ? 'View Book Details' : 'Add New Book'}
        handleClose = {() => window.location.assign('/books')}
        content={   <Form>
          <h3> Book </h3>
<Form.Group as={Row} >
<Form.Label column sm="3">
Name
</Form.Label>
<Col sm="7">

  <TextField
    size='small' 
    style={{ width: '100%' }}
    variant="outlined"
    value={book.name}
    onChange={(e) => {
         
        setBook({...book, name:e.target.value  })
    }}
  />
</Col>
</Form.Group>

<Form.Group as={Row}>
<Form.Label column sm="3">
ISBN
</Form.Label>
<Col sm="7">

<TextField
    size='small' 
    style={{ width: '100%' }}
    variant="outlined"
    value={book.isbn}
    onChange={(e) => {
    
     setBook({...book, isbn:e.target.value  })
 }}
  />
</Col>
</Form.Group>
<h3> Author </h3>
{!id && <DropdownButton id="dropdown-basic-button" title={authorMode} style={{display:'inline'}} size='sm'>
  <Dropdown.Item onClick={() => {setAuthorMode('Assign Existing')}}>Assign Existing</Dropdown.Item>
  <Dropdown.Item onClick={() => {setAuthorMode('Add New')}}>Add New</Dropdown.Item> 
</DropdownButton> }
{( id ||  (!id && authorMode==='Add New')) &&
(<> 

<Form.Group as={Row} >
<Form.Label column sm="3">
First Name
</Form.Label>
<Col sm="7">

<TextField
    size='small' 
    style={{ width: '100%' }}
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

<TextField
    size='small' 
    style={{ width: '100%' }}
    variant="outlined"
    value={book.author?.lastName}
    onChange={(e) => {
    
     setBook({...book, author: {...book.author, lastName: e.target.value } })
 }}
  /> 
</Col>
</Form.Group> </>)}
{ !id && authorMode==='Assign Existing' && (<Form.Group as={Row}>
<Form.Label column sm="3">
Author
</Form.Label>
<Col sm="7">
 
<Autocomplete options={authors}
onChange={(e) =>{
  console.log('autocomplete on change' , e.target.innerHTML.split(','))
  const names = e.target.innerHTML.split(',')
  const firstName = names[1]
  const lastName = names[0]
  const author = authors.find(v => v.lastName === lastName && v.firstName === firstName)
  console.log('found author' , author)
  console.log('SET BOOK HERE' , {...book, author: author._id })

  setBook({...book, author: author._id })

}}/>
</Col>
</Form.Group>)}
</Form>}
        />
           
    </>
       
      );
} 