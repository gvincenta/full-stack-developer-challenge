import {CardColumns, Form, FormControl, InputGroup} from 'react-bootstrap'

import Book from './Book'
export default function(){
    return (
        <>
            <div style={{textAlign:'center', width:'20%', padding: 10, margin:'auto'}}>
                <Form >
                    <InputGroup>
                <InputGroup.Prepend >
      <InputGroup.Text style={{borderStyle:'none none solid none', backgroundColor: 'white'}}>@</InputGroup.Text>
    </InputGroup.Prepend>
                <FormControl type="text" placeholder="Search"  style={{ borderStyle:'none none solid none' }}/>
                </InputGroup>
                    </Form> 

            </div>
        <CardColumns> 
       { [1,2,3,4,5,6,7,8,9,10, 11].map(v => <Book/>)}
    </CardColumns>
    </>
    );
}