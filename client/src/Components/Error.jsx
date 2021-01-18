import React from "react";
import { Alert } from "react-bootstrap";
/**
 * Error component.
 */
export default function ErrorAlert(props) {
    return (
        <Alert variant={"danger"} {...props}>
            Sorry, there was a problem. Please try again later.
        </Alert>
    );
}
