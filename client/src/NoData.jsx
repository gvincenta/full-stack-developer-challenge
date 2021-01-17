import React from "react";
import { Alert } from "react-bootstrap";
import config from "./config.json";
/**
 * No Data alert.
 */
export default function(props) {
    return (
        <Alert variant={"info"} {...props}>
            {config.message.success}
        </Alert>
    );
}
