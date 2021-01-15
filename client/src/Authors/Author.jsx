import React from 'react'
import {Card, Button} from 'react-bootstrap'
export default function({firstName, lastName, _id : id}){
     
    return (<Card style={{width:'75%', marginTop:10}}> 
        <Card.Body>
          <Card.Title> <Card.Link  href={'/author/' + id}> {lastName + ' , ' + firstName} </Card.Link> </Card.Title> 
          
        </Card.Body> 
      </Card>)
}