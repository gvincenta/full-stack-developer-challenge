import React from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import Spinner from "../Spinner";
import Error from "../Components/Error";
import config from "../config.json";
/**
 * Modal layout.
 * @param success : indicates form has been successfully submitted to backend.
 * @param error : indicates there are some backend errors.
 * @param handleClose : function handling close action.
 * @param title : title of modal.
 * @param content : components of modal content to be displayed.
 * @param handleSubmit : function handling submit action.
 * @param loading :  indicates form is currently being submitted to backend.
 * @return a modal layout.
 */
export default function ModalTemplate({
    success,
    error,
    handleClose,
    title,
    content,
    handleSubmit,
    loading,
}) {
    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title> {title} </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {success && ( //success state.
                        <Alert variant={"info"}>{config.message.success}</Alert>
                    )}
                    {error && <Error /> //error state
                    }

                    {loading ? ( //loading state
                        <Spinner />
                    ) : (
                        //normal state
                        content
                    )}
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
