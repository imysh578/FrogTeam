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
  const [what, what변경] = useState("Upbit");

  const handleAccess = (e) => {
    e.preventDefault();
    access변경(e.target.value);
  };
  const handleSecret = (e) => {
    e.preventDefault();
    secret변경(e.target.value);
  };
  const handleWhat = (e) => {
    e.preventDefault();
    what변경(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let body = {
        Access: access,
        Secret: secret,
        whatKey: what,
      };
      const news = await axios.post("http://localhost:5000/auth/key", body);
      window.location.replace("/");
    } catch {
      alert("이미 키가 존재합니다 덮어쓸까요 처럼 다시 묻는거 해볼까?");
      console.log("안댄다 키 씨발");
    }
  };
  // const submitHandler = async (e) => {
  //   try {
  //     e.preventDefault();
  //     const news = await axios.post(
  //       "http://localhost:5000/auth/key",

  //     );
  //   } catch {
  //     console.log("안댄다 키 씨발");
  //   }
  // };

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
            <FormWrap>
              <FormContent>
                <Form>
                  <FormH1>이미 키가 입력되어있는 경우 업데이트 됩니다</FormH1>
                  <select name="whatKey" onChange={handleWhat}>
                    <option value="Upbit">Upbit</option>
                    <option value="Binance">Binance</option>
                  </select>
                  <FormLabel htmlFor="for">accessKey</FormLabel>
                  <FormInput
                    onChange={handleAccess}
                    type="text"
                    name="Access"
                    required
                  />
                  <FormLabel htmlFor="for">secretKey</FormLabel>
                  <FormInput
                    onChange={handleSecret}
                    type="text"
                    name="Secret"
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
