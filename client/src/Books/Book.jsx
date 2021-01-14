import React from 'react'
import {Card, Button} from 'react-bootstrap'
export default function({name, isbn, _id : id}){
     
    return (<Card style={{width:'75%'}}> 
        <Card.Body>
          <Card.Title> <Card.Link  href={'/book/' + id}> {name} </Card.Link> </Card.Title> 
          
        </Card.Body> 
      </Card>)
}