import React from "react";
import { Card, Button } from "react-bootstrap";
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
