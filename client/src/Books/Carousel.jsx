import React from 'react'
import {Carousel, Badge} from 'react-bootstrap'
import image from '../images/BookCover1.jpg'

export default function(){
    return <Carousel>
    <Carousel.Item>
      {/* <img
        className="d-block w-100"
        src={image}
        alt="First slide"
        style={{height: 250, width: '100%'}} 
      /> */}
      <div style={{height: 250, width: '100%', background:'black'}}>
        
      <img 
        src={image}
        alt="First slide"
        style={{height: '80%', width: '10%', padding:'1%', marginLeft: '30%'}} 
      />  
      <div style={{display:'inline'}}>
                <h1 style={{display:'inline'}} >   Best Seller : Title   </h1> 
               
          <p style={{display:'inline', marginTop:10}} > more</p>
           
          </div>
          </div> 
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="holder.js/800x400?text=Second slide&bg=282c34"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="holder.js/800x400?text=Third slide&bg=20232a"
        alt="Third slide"
      />
  
      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
}