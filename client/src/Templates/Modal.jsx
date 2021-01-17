import React, { useEffect, useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import Spinner from "../Spinner";
import Error from "../Error";
/**
 * Modal layout.
 */
import config from "../config.json";
export default function({
    id,
    success,
    error,
    size,
    fetch,
    handleClose,
    title,
    content,
    handleSubmit,
    loading
}) {
    // console.log('PROPS ARE', props)
    console.log("ID ARE", id);
    const [show, setShow] = useState(true);

    return (
        <>
            <Modal show={show} onHide={handleClose} size={size}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {success && (
                        <Alert variant={"info"}>{config.message.success}</Alert>
                    )}
                    {error && <Error />}

                    {loading ? <Spinner /> : content}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {handleSubmit && (
                        <Button variant="primary" onClick={handleSubmit}>
                            Add
                        </Button>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}
