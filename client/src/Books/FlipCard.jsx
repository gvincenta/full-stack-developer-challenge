import React, {useEffect, useState} from 'react'
import FlipCard from '../Templates/FlipCard'
import {Card, ListGroup} from 'react-bootstrap'
import axios from 'axios'
import image from '../images/BookCover1.jpg'

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
  front={  <Card.Body  >   <Card.Img variant="top" src={image} style={{width: '50%' , height: '50%'}}/> <h6 style={{marginTop:'5%',   overflow: 'hidden',
  textOverflow:'ellipsis', whiteSpace:'nowrap'}}  > {name}  </h6>  </Card.Body>}
  back={<Card.Body>  
  <Card.Img variant="top" src={image} style={{width: '35%' , height: '35%'}}/> 
    
    <p style={{    overflow: 'hidden',
  textOverflow:'ellipsis', whiteSpace:'nowrap'}} >  {name} </p>
    <p style={{  overflow: 'hidden',
  textOverflow:'ellipsis', whiteSpace:'nowrap'}} > {isbn} </p>
    <p style={{   overflow: 'hidden',
  textOverflow:'ellipsis', whiteSpace:'nowrap'}} > {book.author?.lastName + ' , '+ book.author?.firstName} </p>
   {/* <Card.Body style={{padding:'2%'}}>   <Card.Img variant="top" src={image} style={{width: '35%' , height: '35%'}}/>  */}
  
  {/* <p style={{  display:'inline'}}  > {name}  {name} </p>    */}
   </Card.Body> }
   /> );
} 