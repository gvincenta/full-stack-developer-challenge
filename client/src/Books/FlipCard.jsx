import React, { useEffect, useState } from "react";
import FlipCard from "../Templates/FlipCard";
import { Card, ListGroup } from "react-bootstrap";
import axios from "axios";
import image from "../images/BookCover1.jpg";

export default function({ name, isbn, _id: id }) {
    const [book, setBook] = useState({});

    useEffect(() => {
        if (id) {
            axios
                .get("/book", { params: { id } })
                .then(res => {
                    console.log("axios get specific book ", res);
                    setBook(res.data);
                })
                .catch(e => {
                    console.log("axios error", e);
                });
        }
    }, [id]);
    return (
        <FlipCard
            front={
                <Card.Body>
                    {" "}
                    <Card.Img
                        variant="top"
                        src={image}
                        style={{ width: "35%", height: "35%" }}
                    />{" "}
                    <p className="no-overflow" style={{ marginTop: "5%" }}>
                        {" "}
                        {name}{" "}
                    </p>{" "}
                </Card.Body>
            }
            back={
                <Card.Body>
                    <Card.Img
                        variant="top"
                        src={image}
                        style={{ width: "25%", height: "25%" }}
                    />

                    <p
                        className="no-overflow"
                        style={{ marginTop: "5%", textAlign: "left" }}>
                        {" "}
                        {"Name: " + name} <br /> {"ISBN: " + isbn} <br />{" "}
                        {"Author: " +
                            book.author?.lastName +
                            " , " +
                            book.author?.firstName}{" "}
                    </p>
                </Card.Body>
            }
        />
    );
}
