import React, { useEffect, useState } from "react";
import FlipCard from "../Templates/FlipCard";
import { Card } from "react-bootstrap";
import axios from "axios";
import image from "../images/BookCover1.jpg";
import config from '../config.json';

/**
 *  Book card detail with flippable content.
 * @param name: name of the book to be displayed. 
 * @param isbn: isbn of the book to be displayed.
 * @param _id : id of the book to be fetched from backend.
 * @return A flippable Card component that shows the book's details when flipped. 
 */
export default function BookFlipCard({ name, isbn, _id: id }) {
    const [book, setBook] = useState({});
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //get from /book/:id
        if (id) {
            axios
                .get(config.baseURL + "/book", { params: { id } })
                .then(res => { 
                    setLoading(false);
                    setBook(res.data);
                })
                .catch(e => {
                    console.log("axios error", e);
                    setLoading(false);
                    setError(true);
                });
        }
    }, [id]);
    return (
        <FlipCard
            loading={loading}
            error={error}
            front={
                //only shows book's name.
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
                //shows book's name. isbn, and its author's details.
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
