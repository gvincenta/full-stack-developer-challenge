import {Card, Button} from 'react-bootstrap'
export default function(){
    return (<Card style={{width:'75%'}}> 
        <Card.Body>
          <Card.Title> <Card.Link onClick={() => {
              console.log('bookname click')
          }}> Book Name  </Card.Link> </Card.Title> 
          <Card.Text>Book Desc</Card.Text> 
        </Card.Body> 
      </Card>)
}