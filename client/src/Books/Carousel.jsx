import React, { useState, useEffect } from "react";
import { Carousel, Badge } from "react-bootstrap";
import axios from "axios";

import image from "../images/BookCover1.jpg";
import Spinner from "../Spinner";
import Error from "../Error";
export default function() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        axios
            .get("/books")
            .then(res => {
                console.log("AXIOS get all data ", res);
                const maxHighlight = Math.min(3, res.data.length);
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
            {loading ? (
                <div className="carousel-container">
                    {" "}
                    <Spinner />{" "}
                </div>
            ) : error ? (
                <div className="carousel-container">
                    {" "}
                    <Error />{" "}
                </div>
            ) : (
                <Carousel>
                    {data.length > 0 ? (
                        data.map((v, idx) => (
                            <Carousel.Item key={idx}>
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
                                    <h1 style={{ display: "inline" }}>
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
                    ) : (
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
                                    {" "}
                                    No data currently available.{" "}
                                </h1>
                            </div>
                        </Carousel.Item>
                    )}
                </Carousel>
            )}
        </>
    );
}
