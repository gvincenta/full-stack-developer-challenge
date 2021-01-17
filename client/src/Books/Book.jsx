import React from "react";
import { Card, Button } from "react-bootstrap";
import "../Templates/Modal";
/**
 * Book card detail with its name.
 */
export default function({ name, isbn, _id: id }) {
    return (
        <Card className="card-item">
            <Card.Body>
                <Card.Title>
                    {" "}
                    <Card.Link href={"/book/" + id}> {name} </Card.Link>{" "}
                </Card.Title>
            </Card.Body>
        </Card>
    );
}
