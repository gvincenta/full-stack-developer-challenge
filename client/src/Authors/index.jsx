import React, {useEffect, useState} from 'react'
import Home from '../Templates/Home'
import Modal from './Modal'
import Author from './Author'

export default function(props){
     


    return (
        <>
          <Home
          fetch='/authors'
          sortData = {data => {
            return data.sort((left, right) => {
              return left.lastName.toUpperCase().localeCompare(right.lastName.toUpperCase());
            })
          }}
          Item={Author}
          Modal={Modal}
          search={(data, search) => {
            return data.filter(v =>   v.firstName.toUpperCase().search(search.toUpperCase()) !== -1 ||  v.lastName.toUpperCase().search(search.toUpperCase()) !== -1)
          }}
          />
    </>
    );
}