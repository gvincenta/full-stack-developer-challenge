import React, { useEffect } from "react";
import "./FlipCard.css";
/**
 * Flip card layout. 
 */
export default function({ front, back }) {
    const height = 250;
    return (
        <div
            className="flip-card"
            style={{
                width: "65%",
                height,
                borderRadius: 20,
                marginLeft: 20,
                marginTop: 10,
                justifySelf: "center"
            }}>
            <div className="flip-card-inner">
                <div
                    className="flip-card-front"
                    style={{ height, borderRadius: 20, background: "#AB7742" }}>
                    {front}
                </div>
                <div
                    className="flip-card-back"
                    style={{ height, borderRadius: 20, background: "#AB7742" }}>
                    {back}
                </div>
            </div>
        </div>
    );
}
