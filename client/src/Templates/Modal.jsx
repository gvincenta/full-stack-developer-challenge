import React, {useEffect, useState} from 'react'
import { Modal, Button, Spinner, Alert  } from 'react-bootstrap'
import './Modal.css'
export default function({id, success, error,  fetch, handleClose, title, content, handleSubmit, loading}){ 

    // console.log('PROPS ARE', props)
    console.log('ID ARE', id)
    const [show, setShow] = useState(true); 
 
    
 

     
   
    return (
        <> 
    
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> {title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {success &&  <Alert   variant={'info'}>
     Your response has been recorded. You may now close this window. 
  </Alert>}
  {error &&   <Alert   variant={'danger'}>
  Sorry, there was a problem. Please try again later.
  </Alert>}
            {loading  ? 
             <Spinner animation="border" role="status" style={{marginLeft: '50%'}} variant="primary">
  <span className="sr-only">Loading...</span>
</Spinner> 
  : content } 
   
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            {handleSubmit &&   <Button variant="primary" onClick={handleSubmit}>
                Add
              </Button>}
            
 
            </Modal.Footer>
          </Modal>
        </>
      );
} 