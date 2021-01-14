import React, {useEffect, useState} from 'react'
import {CardColumns, Form, FormControl, InputGroup, Button} from 'react-bootstrap'
import axios from 'axios'
 
import { 
    useParams,
    useRouteMatch
  } from "react-router-dom";
  
import Book from './Book'
import Modal from './Modal'

export default function(props){
    const [books, setBooks] = useState([]) 
    console.log('PROPS ARE', props) 
    
    const { id } = useParams();
    console.log('ID ARE', id)

    useEffect(() => {
      
        axios.get('/books')
        .then(res =>{
            console.log('axios get all books ', res)
            setBooks(res.data)
        })
        .catch(e => {
            console.log('axios error', e)

        })
       
    }, []) 


    return (
        <>
            <div style={{textAlign:'center', width:'15%', padding: 10, margin:'auto'}}>
                <Form >
                    <InputGroup>
                <InputGroup.Prepend >
      <InputGroup.Text style={{borderStyle:'none none solid none', backgroundColor: 'white'}}>@</InputGroup.Text>
    </InputGroup.Prepend>
                <FormControl type="text" placeholder="Search"  style={{ borderStyle:'none none solid none' }}/>
                <Button size='sm'>+ </Button>
                </InputGroup>

                    </Form> 

            </div>
        <CardColumns> 
       { books.map(v => <Book key={v._id} {...v}/>)}
    </CardColumns>
    {id && <Modal id={id}/>}
    </>
    );
}