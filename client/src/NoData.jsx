import React from "react";
import { Alert } from "react-bootstrap";

export default function(props) {
    return (
        <Alert variant={"info"} {...props}>
            No data currently available.
        </Alert>
    );
}
