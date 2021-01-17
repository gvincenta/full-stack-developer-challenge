import React, {useEffect} from 'react'
import  './FlipCard.css'
function randomBg(){
  var x = Math. floor(Math. random() * 175 + 80);
var y = Math. floor(Math. random() *175 + 80 );
var z = Math. floor(Math. random() *175 + 80); //+80 to avoid dark colors
  return "rgb(" + x + "," + y + "," + z + ")";
}

export default function ({front, back} ){

  const height = 250
  return ( <div className="flip-card"  style={{ width:'65%', height,  borderRadius: 20, marginLeft:20, marginTop:10,  justifySelf:'center'}} >
  <div className="flip-card-inner">
    <div className="flip-card-front" style={{  height,    borderRadius: 20, background: '#AB7742'   }}>
        {front}
    </div>
    <div className="flip-card-back" style={{ height,     borderRadius: 20, background: '#AB7742'   }}>
        {back}
       
    </div>
  </div>
</div> );
}
 