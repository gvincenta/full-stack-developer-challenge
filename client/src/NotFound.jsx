import React from "react";
import { Alert } from "react-bootstrap";
/**
 * 404 component.
 */
export default function(props) {
    return (
        <Alert variant={"danger"} {...props}>
            Error 404 - Not Found <br /> The resource you are looking for has
            been removed, had its name changed, or is temporarily unavailable.
        </Alert>
    );
}
