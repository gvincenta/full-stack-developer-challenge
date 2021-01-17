import React from "react";
import { Alert } from "react-bootstrap";
export default function(props) {
    return (
        <Alert variant={"danger"} {...props}>
            Sorry, there was a problem. Please try again later.
        </Alert>
    );
}
