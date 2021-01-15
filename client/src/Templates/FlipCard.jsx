import React, {useEffect} from 'react'
import  './FlipCard.css'
function randomBg(){
  var x = Math. floor(Math. random() * 175 + 80);
var y = Math. floor(Math. random() *175 + 80 );
var z = Math. floor(Math. random() *175 + 80); //+80 to avoid dark colors
  return "rgb(" + x + "," + y + "," + z + ")";
}

export default function ({front, back} ){

  const height = Math.random() * 120+ 120
  const background = randomBg()
  return ( <div className="flip-card" style={{ width:'75%', height, borderRadius: 20, marginLeft:20, marginTop:10  }} >
  <div className="flip-card-inner">
    <div className="flip-card-front" style={{  height , borderRadius: 20, background,   }}>
        {front}
    </div>
    <div className="flip-card-back" style={{  height , borderRadius: 20, background,  }}>
        {back}
       
    </div>
  </div>
</div> );
}
 