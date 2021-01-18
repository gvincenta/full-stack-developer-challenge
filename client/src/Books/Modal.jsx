import React, { useEffect, useState } from "react";
import { Form, Col, Row, Dropdown, DropdownButton } from "react-bootstrap";
import axios from "axios";
import { TextField } from "@material-ui/core";
import Autocomplete from "../Autocomplete";
import Modal from "../Templates/Modal"; 
import config from "../config.json";
/**
 *  Book modal (with form) details.
 * @param add: whether modal is for adding new book or just displaying book details,
 * @param id : id of the book to be fetched from backend. 
 * @return a modal to display a book's (and its author) details / a form to add new book (with existing or new authors). 
 */
export default function BookModal(props) {
    const { id, add } = props;
    const [book, setBook] = useState({});
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const [formError, setFormError] = useState({});
    const [authorMode, setAuthorMode] = useState("Assign Existing");
    const validate = () => {
        //validate book and author details.
        //book must have an isbn and a name.
        //book must be assigned to existing author, or with new author.
        console.log("CHECKING..", { book });

        const newState = {
            name: (!book.name || book.name?.length < 1) && "Name is required.",
            isbn: (!book.isbn || book.isbn?.length < 1) && "ISBN is required.",
            author:
                authorMode === "Assign Existing"
                    ? (!book.author || book.author?.length < 1) &&
                      "Author is required."
                    : {
                          firstName:
                              (!book.author?.firstName ||
                                  book.author?.firstName?.length < 1) &&
                              "First Name is required.",
                          lastName:
                              (!book.author?.lastName ||
                                  book.author?.lastName?.length < 1) &&
                              "Last Name is required."
                      }
        };
        setFormError(newState);

        if (
            newState.name ||
            newState.isbn ||
            (authorMode === "Assign Existing" && newState.author) ||
            (authorMode === "Add New" &&
                (newState.author?.firstName || newState.author?.lastName))
        ) {
            console.log("NEW STATE ERORR", newState);
            return false;
        }
        return true;
    };
    const handleSubmit = async e => {
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
        console.log("form error", { formError });
        var createAuthorResponse = null;

        /* for assigning existing authors, book has {author: authorID}
        for adding new author, book has {author: {firstName, lastName}}  */

        var author = book.author;

        if (authorMode === "Add New") {
            createAuthorResponse = await axios.post("author", book.author);
            console.log("CREATE AUTHOR", createAuthorResponse.data);
            author = createAuthorResponse.data._id;
        }

        console.log("SUBMITTING THIS DATA", { ...book, author });
        axios
            .post("/book", { ...book, author })
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
                .get("/book", { params: { id } })
                .then(res => {
                    console.log("axios get specific book ", res);
                    setBook(res.data);
                })
                .catch(e => {
                    console.log("axios error", e);
                });
        }
    }, [id]);
    useEffect(() => {
        if (!id && authorMode === "Assign Existing") {
            axios
                .get("/authors")
                .then(res => {
                    console.log("axios get all authors ", res);
                    setAuthors(res.data);
                })
                .catch(e => {
                    console.log("axios error", e);
                });
        }
    }, [id, authorMode]);

    return (
        <>
            <Modal
                {...props}
                loading={loading}
                success={success}
                error={error}
                fetch="/book"
                handleSubmit={add && handleSubmit}
                title={id ? "View Book Details" : "Add New Book"}
                handleClose={() => window.location.assign("/books")}
                content={
                    <Form>
                        <h3> Book </h3>
                        {[
                            {
                                label: "Name",
                                field: "name",
                                onChange: e => {
                                    setBook({ ...book, name: e.target.value });
                                }
                            },
                            {
                                label: "ISBN",
                                field: "isbn",
                                onChange: e => {
                                    setBook({ ...book, isbn: e.target.value });
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
                                        value={book[field]}
                                        onChange={onChange}
                                        error={Boolean(formError[field])}
                                        helperText={formError[field]}
                                    />
                                </Col>
                            </Form.Group>
                        ))}

                        <h3> Author </h3>
                        {!id && (
                            <DropdownButton
                                id="dropdown-basic-button"
                                title={authorMode}
                                style={{ display: "inline" }}
                                size="sm">
                                <Dropdown.Item
                                    onClick={() => {
                                        setFormError({...formError, author: false});
                                        setAuthorMode("Assign Existing");
                                    }}>
                                    Assign Existing
                                </Dropdown.Item>
                                <Dropdown.Item
                                    onClick={() => {
                                        setFormError({...formError, author: false});
                                        setAuthorMode("Add New");
                                    }}>
                                    Add New
                                </Dropdown.Item>
                            </DropdownButton>
                        )}
                        {(id || (!id && authorMode === "Add New")) && (
                            <>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3">
                                        First Name
                                    </Form.Label>
                                    <Col sm="7">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            value={book.author?.firstName}
                                            onChange={e => {
                                                setBook({
                                                    ...book,
                                                    author: {
                                                        ...book.author,
                                                        firstName:
                                                            e.target.value
                                                    }
                                                });
                                            }}
                                            error={Boolean(
                                                formError.author?.firstName
                                            )}
                                            helperText={
                                                formError.author?.firstName
                                            }
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3">
                                        Last Name
                                    </Form.Label>
                                    <Col sm="7">
                                        <TextField
                                            size="small"
                                            fullWidth
                                            variant="outlined"
                                            value={book.author?.lastName}
                                            onChange={e => {
                                                setBook({
                                                    ...book,
                                                    author: {
                                                        ...book.author,
                                                        lastName: e.target.value
                                                    }
                                                });
                                            }}
                                            error={Boolean(
                                                formError.author?.lastName
                                            )}
                                            helperText={
                                                formError.author?.lastName
                                            }
                                        />
                                    </Col>
                                </Form.Group>{" "}
                            </>
                        )}
                        {!id && authorMode === "Assign Existing" && (
                            <Form.Group as={Row}>
                                <Form.Label column sm="3">
                                    Author
                                </Form.Label>
                                <Col sm="7">
                                    <Autocomplete
                                        options={authors}
                                        error={Boolean(formError.author)}
                                        helperText={formError.author}
                                        onChange={e => {
                                            console.log(
                                                "autocomplete on change",
                                                e.target.innerHTML.split(",")
                                            );
                                            const names = e.target.innerHTML.split(
                                                ","
                                            );
                                            const firstName = names[1];
                                            const lastName = names[0];
                                            const author = authors.find(
                                                v =>
                                                    v.lastName === lastName &&
                                                    v.firstName === firstName
                                            );
                                            console.log("found author", author);
                                            console.log("SET BOOK HERE", {
                                                ...book,
                                                author: author?._id
                                            });

                                            setBook({
                                                ...book,
                                                author: author?._id
                                            });
                                        }}
                                    />
                                </Col>
                            </Form.Group>
                        )}
                    </Form>
                }
            />
        </>
    );
}
