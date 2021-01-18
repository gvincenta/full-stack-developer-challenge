import React from "react";
import "./FlipCard.css";
import Spinner from "../Spinner";
import Error from "../Error";
import config from "../config.json";
/**
 * Flip card layout.
 * @param front : what to show when card is not flipped.
 * @param back: what to show when card is flipped. 
 * @param loading : indicates whether we're loading something from backend or not. 
 * @param error : indicates whether backend responded with error or not. 
 * @return a flippable card with 2 faces and 3D animation. 
 */
export default function FlipCardTemplate({ front, back, loading, error }) {
    const height = 250;
    return (
        <div
            className="flip-card"
            style={{
                width: "65%",
                height,
                borderRadius: config.styles.borderRadius,
                marginLeft: 20,
                marginTop: 10,
                justifySelf: "center",
                background: error && config.styles.colors.primary  
            }}>
             {loading?     <Spinner />  //loading state
             : error?  <Error/> //error state
             : //normal state
             <div className="flip-card-inner"> 
            <div
                    className="flip-card-front"
                    style={{ height, borderRadius:  config.styles.borderRadius, background: config.styles.colors.primary }}>
                    {front}
                </div>
                <div
                    className="flip-card-back"
                    style={{ height, borderRadius:  config.styles.borderRadius, background:  config.styles.colors.primary}}>
                    {back}
                </div> 
               
            </div>}
            
        </div>
    );
}
