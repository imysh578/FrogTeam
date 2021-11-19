import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  Container,
  FormWrap,
  Icon,
  Form,
  Text,
  FormButton,
  FormButton2,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
} from "./SignupElements";
import axios from "axios";

const ApiKey = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [access, access변경] = useState();
  const [secret, secret변경] = useState();

  const handleAccess = ({ target: { value } }) => access변경(value);
  const handleSecret = ({ target: { value } }) => secret변경(value);

  const handleSubmit = async (e) => {
    try {
      console.log("일단 나오나 보자");
      console.log(access);
      const news = await axios.post("http://localhost:5000/auth/key", access);
    } catch {
      console.log("안댄다 키 씨발");
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        나의 자산 불러오기
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Api 키 입력</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Icon to="/">Frog</Icon>
            <FormWrap>
              <FormContent>
                <Form>
                  <FormH1>API 키 입력</FormH1>
                  <select name="whatKey">
                    <option value="Upbit">Upbit</option>
                    <option value="Binance">Binance</option>
                  </select>
                  <FormLabel htmlFor="for">accessKey</FormLabel>
                  <FormInput
                    onchange={handleAccess}
                    type="text"
                    name="Access"
                    // value={value}
                    required
                  />
                  <FormLabel htmlFor="for">secretKey</FormLabel>
                  <FormInput
                    onchange={handleSecret}
                    type="text"
                    name="Access"
                    required
                  />
                </Form>
              </FormContent>
            </FormWrap>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmit}>
            Go
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ApiKey;
