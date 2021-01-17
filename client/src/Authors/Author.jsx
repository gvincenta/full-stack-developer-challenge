import React from "react";
import { Card } from "react-bootstrap";
/**
 * Author card detail with firstName and lastName.
 */
export default function({ firstName, lastName, _id: id }) {
    return (
        <Card className="card-item">
            <Card.Body>
                <Card.Title>
                    {" "}
                    <Card.Link href={"/author/" + id}>
                        {" "}
                        {lastName + " , " + firstName}{" "}
                    </Card.Link>{" "}
                </Card.Title>
            </Card.Body>
        </Card>
    );
}
