import React, { useEffect, useState } from "react";
import Modal from "../Templates/Modal";
import axios from "axios";
import { Form, Col, Row } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import config from '../config.json'
/**
 *  Author modal logic.
 */
export default function(props) {
    const { id, add } = props;
    const [author, setAuthor] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({});
    const validate = () => { //author modal validation (must have firstName and lastName filled).
        console.log("CHECKING..", { author });

        const newState = {
            firstName:
                (!author.firstName || author.firstName?.length < 1) &&
                "First Name is required.",
            lastName:
                (!author.lastName || author.lastName?.length < 1) &&
                "Last Name is required."
        };
        setFormError(newState);

        if (newState.firstName || newState.lastName) {
            console.log("NEW STATE ERORR", newState);
            return false;
        }
        return true;
    };
    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);
        setFormError({});

        if (!validate()) {
            //there is an error.
            setLoading(false);
            return;
        }
        //posts to /author.
        axios
            .post("/author", author)
            .then(res => {
                console.log("SUBMITTED", res);
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                }, config.loading);
            })
            .catch(e => {
                console.log("ERROR", e);
                setTimeout(() => {
                    setLoading(false);
                    setError(true);
                }, config.loading);
            });
    };

    useEffect(() => {
        if (id) {
            axios
                .get("/author/", { params: { id } }) //get from /author/:id
                .then(res => {
                    console.log("axios get specific book ", res);
                    setAuthor(res.data);
                })
                .catch(e => {
                    console.log("axios error", e);
                });
        }
    }, [id]);

    return (
        <Modal
            {...props}
            loading={loading}
            success={success}
            error={error}
            fetch="/author"
            handleSubmit={add && handleSubmit}
            title={id ? "View Author Details" : "Add New Author"}
            handleClose={() => window.location.assign("/authors")}
            content={
                <Form>
                    {[
                        {
                            label: "First Name",
                            field: "firstName",
                            onChange: e => {
                                setAuthor({
                                    ...author,
                                    firstName: e.target.value
                                });
                            }
                        },
                        {
                            label: "Last Name",
                            field: "lastName",
                            onChange: e => {
                                setAuthor({
                                    ...author,
                                    lastName: e.target.value
                                });
                            }
                        }
                    ].map(({ label, field, onChange }, idx) => (
                        <Form.Group as={Row} key={idx}>
                            <Form.Label column sm="3">
                                {label}
                            </Form.Label>
                            <Col sm="7">
                                <TextField
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    value={author[field]}
                                    onChange={onChange}
                                    error={Boolean(formError[field])}
                                    helperText={formError[field]}
                                />
                            </Col>
                        </Form.Group>
                    ))}
                </Form>
            }
        />
    );
}
