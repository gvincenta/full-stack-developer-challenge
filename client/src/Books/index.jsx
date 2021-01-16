import React, {useEffect, useState} from 'react'
import axios from 'axios' 
import { 
    useParams,
    useRouteMatch
  } from "react-router-dom";
  
import Home from '../Templates/Home'
import Carousel from './Carousel'
import Book from './Book'
import Modal from './Modal'
import FlipCard from './FlipCard'

export default function(props){
    const [books, setBooks] = useState([]) 
    const [add, setAdd] = useState(false) 

    console.log('PROPS ARE', props) 
    
    const { id } = useParams();
    console.log('ID ARE', id)

    useEffect(() => {
      
        axios.get('/books')
        .then(res =>{
            console.log('axios get all books ', res)
            setBooks([...res.data, ...res.data, ...res.data , ...res.data, ...res.data])
        })
        .catch(e => {
            console.log('axios error', e)

        })
       
    }, []) 


    return (
     <>
      <Carousel/>
        <Home
          fetch='/books'
          Item={FlipCard}
          Modal={Modal}
          search={(data, search) => {
            return data.filter(v =>   v.name.toUpperCase().search(search.toUpperCase()) !== -1)
          }}
          />
          </>
    );
}