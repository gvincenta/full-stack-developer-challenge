import React from "react";
import { Spinner } from "react-bootstrap";

export default function SpinnerComponent(props) {
    return (
        <Spinner
            animation="border"
            role="status"
            style={{ marginLeft: "50%" }}
            variant="primary"
            {...props}
        >
            <span className="sr-only">Loading...</span>
        </Spinner>
    );
}
