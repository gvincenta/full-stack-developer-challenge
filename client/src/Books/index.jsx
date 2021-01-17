import React, { useEffect, useState } from "react";
import { useParams, useRouteMatch } from "react-router-dom";

import Home from "../Templates/Home";
import Carousel from "./Carousel";
import Book from "./Book";
import Modal from "./Modal";
import FlipCard from "./FlipCard";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
export default function(props) {
    const [books, setBooks] = useState([]);
    const [add, setAdd] = useState(false);
    const [withPopUp, setWithPopUp] = useState(true);

    console.log("PROPS ARE", props);

    const { id, template } = useParams();
    console.log("template", template);
    console.log("ID ARE", id);

    return (
        <>
            <Carousel />

            <Home
                fetch="/books"
                Item={withPopUp ? Book : FlipCard}
                toolbar={
                    //toggle between 2 layouts.
                    <FormControlLabel
                        control={
                            <Switch
                                checked={withPopUp}
                                onChange={() => {
                                    setWithPopUp(!withPopUp);
                                }}
                                color="primary"
                            />
                        }
                        label={
                            withPopUp
                                ? "With Pop Up Window and Without Image"
                                : "Flippable and With Image"
                        }
                    />
                }
                sortData={data => {
                    //sort by book's name ascending.
                    return data.sort((left, right) => {
                        return left.name
                            .toUpperCase()
                            .localeCompare(right.name.toUpperCase());
                    });
                }}
                Modal={Modal}
                search={(data, search) => {
                    //search filter.
                    return data.filter(
                        v =>
                            v.name
                                .toUpperCase()
                                .search(search.toUpperCase()) !== -1
                    );
                }}
            />
        </>
    );
}
