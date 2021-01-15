import React, {useEffect, useState} from 'react'
import FlipCard from '../Templates/FlipCard'
import {Card, Button} from 'react-bootstrap'
import axios from 'axios'

export default function ({name, isbn, _id : id} ){
    const [book, setBook] = useState({})  

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
  <FlipCard
  front={ <Card.Title   > {name}  </Card.Title> }
  back={<> <Card.Title   > {name}  </Card.Title> 
    <Card.Text   > ISBN : {isbn}  </Card.Text>
    <Card.Text   > Author : {book.author?.lastName + ' , '+ book.author?.firstName}  </Card.Text> </>  }
   /> );
} 