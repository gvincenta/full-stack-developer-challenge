import React, {useEffect, useState} from 'react'
import {CardColumns, Form, FormControl, InputGroup, Button} from 'react-bootstrap'
import axios from 'axios'
import {TextField} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { 
    useParams,
    useRouteMatch
  } from "react-router-dom";
    

export default function(props){
    const [data, setData] = useState([]) 
    const [add, setAdd] = useState(false) 

    console.log('PROPS ARE', props) 
    
    const {Modal, fetch , Item, search: searchFunction} = props;
    const { id } = useParams();
    const [search, setSearch] = useState('')
    console.log('ID ARE', id)

    useEffect(() => {
      
        axios.get(fetch)
        .then(res =>{
            console.log('axios get all data ', res)
            setData(res.data)
        })
        .catch(e => {
            console.log('axios error', e)

        })
       
    }, []) 


    return (
        <>
            <div style={{textAlign:'center', width:'15%', padding: 10, margin:'auto'}}>
            <TextField
          size='small' 
          style={{ width: '100%' }}
          variant="outlined"
          placeholder='Search...'
          value={search}
          onChange={(e) => {
              console.log('e.target', e.target.value, search)
          
           setSearch(e.target.value)
       }}
        />

            </div>
            <div style={{display:'grid', gridTemplateColumns:'auto auto auto auto'}}>
       {search.length === 0 ?  data.map(v => <Item key={v._id} {...v}/>) : searchFunction(data, search).map(v => <Item key={v._id} {...v}/>)  }
     </div>
    <Fab aria-label='Add' style={{ position: 'absolute', bottom: 50, right: 50}} color='primary' onClick={() => setAdd(true)}>
    <AddIcon />
          </Fab>
    {(id || add) && <Modal id={id} add={add}/>}
    </>
    );
}