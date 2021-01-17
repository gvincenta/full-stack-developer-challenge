import React, { useEffect, useState } from "react";
import Home from "../Templates/Home";
import Modal from "./Modal";
import Author from "./Author";
/**
 * Author homepage. 
 */
export default function(props) {
    return (
        <>
            <Home
                fetch="/authors"
                sortData={data => { //sort by lastName ascending.
                    return data.sort((left, right) => {
                        return left.lastName
                            .toUpperCase()
                            .localeCompare(right.lastName.toUpperCase());
                    });
                }}
                Item={Author}
                Modal={Modal}
                search={(data, search) => { //search by firstName OR lastName
                    return data.filter(
                        v =>
                            v.firstName
                                .toUpperCase()
                                .search(search.toUpperCase()) !== -1 ||
                            v.lastName
                                .toUpperCase()
                                .search(search.toUpperCase()) !== -1
                    );
                }}
            />
        </>
    );
}
