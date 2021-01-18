import React from "react";
import { Card } from "react-bootstrap";
import "../Templates/Modal";
/**
 * Book card detail with its name.
 * @param name: name of the book to be displayed.
 * @param _id : id of the book to be navigated to.
 * @return A Card component linking to /book/:id to show more details.
 */
export default function Book({ name, _id: id }) {
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
