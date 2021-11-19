import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import './ModalComponents.scss'

const ModalComponent = ({ show, onHide, children }) => {
	return (
		<div >
			<Modal
				show={show}
				onHide={onHide}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Modal heading
					</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer>
					<Button onClick={onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default ModalComponent;
