import React, {useEffect, useState} from 'react'
import {Alert} from 'react-bootstrap'
import axios from 'axios'
import {TextField} from '@material-ui/core'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { 
    useParams,
    useRouteMatch
  } from "react-router-dom";
import Spinner from '../Spinner'
import Error from '../Error'
import NoData from '../NoData'

export default function(props){
    const [data, setData] = useState([]) 
    const [add, setAdd] = useState(false) 
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    console.log('PROPS ARE', props) 
    
    const {Modal, fetch , Item, search: searchFunction, toolbar, sortData} = props;
    const { id } = useParams();
    const [search, setSearch] = useState('')
    console.log('ID ARE', id)

    useEffect(() => {
      
        axios.get(fetch)
        .then(res =>{
            console.log('axios get all data ', res)
            setData( sortData ? sortData(res.data|| []) : res.data || [])
            setLoading(false)
        })
        .catch(e => {
            console.log('axios error', e)
            setLoading(false)
            setError(true)
        })
       
    }, []) 


    return (
        <>
            <div style={{textAlign:'center', width:'30%', padding: 10, margin:'auto'}}>
            <TextField
          size='small' 
          fullWidth 
          variant="outlined" 
          placeholder='Search...'
          value={search}
          onChange={(e) => {
              console.log('e.target', e.target.value, search)
          
           setSearch(e.target.value)
       }}
        />
        {toolbar}

            </div>
           
       {
           loading ?  <Spinner/> : error ? <Error className='homepage-alert'/> : 
       data.length > 0 ?   <div style={{display:'grid', gridTemplateColumns:'33% 33% 33%', padding:'auto',  justifyContent: 'center', alignContent: 'center', rowGap:'5%'}}>
          {  search.length === 0 ?  data.map(v => <Item key={v._id} {...v}/>) : searchFunction(data, search).map(v => <Item key={v._id} {...v}/>)}
            </div>
        :     <NoData className='homepage-alert'/>}
     
    <Fab aria-label='Add' style={{ position: 'sticky', bottom: '10%', left: '90%'}} color='primary' onClick={() => setAdd(true)}>
    <AddIcon />
          </Fab>
    {(id || add) && <Modal id={id} add={add}/>}
    </>
    );
}