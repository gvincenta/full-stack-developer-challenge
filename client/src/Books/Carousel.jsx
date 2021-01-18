import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import axios from "axios";

import image from "../images/BookCover1.jpg";
import Spinner from "../Spinner";
import Error from "../Components/Error";
import config from "../config.json";
/**
 * Book carousel showing: Best Seller, Most Popular, and New Releases.
 */
export default function BookCarousel() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("/books")
            .then(res => {
                console.log("AXIOS get all data ", res);
                /*takes in up to first 3 books returned from backend.*/
                const maxHighlight = Math.min(3, res.data.length); //allow up to 3 books on carousel.
                setData(res.data.slice(0, maxHighlight));
                setLoading(false);
            })
            .catch(e => {
                console.log("axios error", e);
                setError(true);
                setLoading(false);
            });
    }, []);
    return (
        <>
            {" "}
            {loading ? ( //loading state
                <div className="carousel-container">
                    {" "}
                    <Spinner />{" "}
                </div>
            ) : error ? ( //error state
                <div className="carousel-container">
                    {" "}
                    <Error />{" "}
                </div>
            ) : (
                <Carousel>
                    {data.length > 0 ? ( //there are some data
                        data.map((v, idx) => (
                            <Carousel.Item key={idx} className="no-overflow">
                                <div className="carousel-container">
                                    <img
                                        src={image}
                                        alt="BookCover1.jpg"
                                        style={{
                                            height: "80%",
                                            width: "10%",
                                            padding: "1%",
                                            marginLeft: "30%"
                                        }}
                                    />
                                    <h1 style={{ display: "inline" }} >
                                        {" "}
                                        {idx === 0
                                            ? "Best Seller"
                                            : idx === 1
                                            ? "Most Popular"
                                            : "New Releases"}{" "}
                                        {" : " + v.name}{" "}
                                    </h1>

                                    <p style={{ display: "inline" }}>
                                        {" "}
                                        <a href={"/book/" + v._id}>
                                            {" "}
                                            more{" "}
                                        </a>{" "}
                                    </p>
                                </div>
                            </Carousel.Item>
                        ))
                    ) : ( //no data available.
                        <Carousel.Item>
                            <div
                                style={{
                                    height: 250,
                                    width: "100%",
                                    background: "black"
                                }}>
                                <h1
                                    style={{
                                        marginLeft: "30%",
                                        paddingTop: "5%"
                                    }}>
                                    {config.message.noData}
                                </h1>
                            </div>
                        </Carousel.Item>
                    )}
                </Carousel>
            )}
        </>
    );
}
