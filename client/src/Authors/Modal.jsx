import React, {useEffect, useState} from 'react'
import Modal from '../Templates/Modal'
import axios from 'axios'
import { Form, Col, Row} from 'react-bootstrap'
import {TextField} from '@material-ui/core' 
export default function(props){
    
    const {id, add} = props
    const [author, setAuthor] = useState([])  
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)

    const handleSubmit =  (e) => {
        e.preventDefault();
        setLoading(true)
        setSuccess(null)
        setError(null)
        axios.post('/author', author)
        .then((res) => {
            console.log('SUBMITTED', res)
            setTimeout(() => {
                setLoading(false);
                setSuccess(true);
            }, 2000)
            
        })
        .catch( (e) => {
            console.log('ERROR', e)
            setTimeout(() => {
                setLoading(false);
                setError(true);
            }, 2000)

        })
        
    } 

    useEffect(() => {
        if (id) {
         axios.get( '/author/',{params : {id }})
         .then(res =>{
             console.log('axios get specific book ', res)
             setAuthor(res.data)
         })
         .catch(e => {
             console.log('axios error', e)
 
         })
        }
         
     }, [id])

    return (
        <>
        <Modal
        {...props} 
        loading={loading}
        success={success}
        error={error}
        fetch='/author'
        handleSubmit={add && handleSubmit}
        title={id ? 'View Author Details' : 'Add New Author'}
        handleClose = {() => window.location.assign('/authors')}
        content={<Form>
            
<Form.Group as={Row} >
<Form.Label column sm="3">
  First Name
</Form.Label>
<Col sm="7">

<TextField
      size='small' 
      style={{ width: '100%' }}
      variant="outlined"
      value={author.firstName}
      onChange={(e) => {
      
       setAuthor({...author,  firstName: e.target.value  })
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
      value={author.lastName}
      onChange={(e) => {
      
       setAuthor({...author,  lastName: e.target.value  })
   }}
    /> 
</Col>
</Form.Group>
</Form>}
        />
           
    </>
    );
}