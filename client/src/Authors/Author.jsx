import React from "react";
import { Card } from "react-bootstrap";
/**
 * Author card detail with firstName and lastName.
 * @param firstName: author's first name to be displayed.
 * @param lastName: author's last name to be displayed.
 * @param _id :id of the author to be navigated to.
 */
export default function Author({ firstName, lastName, _id: id }) {
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
