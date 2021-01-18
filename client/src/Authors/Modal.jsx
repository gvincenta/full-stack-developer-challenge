import React, { useEffect, useState } from "react";
import Modal from "../Templates/Modal";
import axios from "axios";
import { Form, Col, Row } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import config from "../config.json";
/**
 *  Author modal logic.
 * @param add: whether modal is for adding new author or just displaying author's details.
 * @param id : id of the author to be fetched from backend.
 * @return a modal to display an author's details / a form to add new author.
 */
export default function AuthorModal(props) {
    const { id, add } = props;
    const [author, setAuthor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [formError, setFormError] = useState({});
    const validate = () => {
        //author modal validation (must have firstName and lastName filled).

        const newState = {
            firstName:
                (!author.firstName || author.firstName?.length < 1) &&
                "First Name is required.",
            lastName:
                (!author.lastName || author.lastName?.length < 1) &&
                "Last Name is required.",
        };
        setFormError(newState);

        if (newState.firstName || newState.lastName) {
            return false;
        }
        return true;
    };
    const handleSubmit = (e) => {
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
            .then((res) => {
                setTimeout(() => {
                    setLoading(false);
                    setSuccess(true);
                }, config.loading);
            })
            .catch((e) => {
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
                .then((res) => {
                    setAuthor(res.data);
                    setLoading(false);
                })
                .catch((e) => {
                    setLoading(false);
                    setError(true);
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
                            onChange: (e) => {
                                setAuthor({
                                    ...author,
                                    firstName: e.target.value,
                                });
                            },
                        },
                        {
                            label: "Last Name",
                            field: "lastName",
                            onChange: (e) => {
                                setAuthor({
                                    ...author,
                                    lastName: e.target.value,
                                });
                            },
                        },
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
