import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Container,
  FormWrap,
  Icon,
  Form,
  Text,
  FormButton,
  FormContent,
  FormH1,
  FormInput,
  FormLabel,
  FormButton2,
} from "./SigninElements";
const CryptoJS = require("crypto-js");
const encryptKey = process.env.ENCRYPT_KEY || "1234!@#$";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submited, setSubmited] = useState(false);

  const handleSubmitOnclick = (e) => {
    console.log("submit clicked");
    e.preventDefault();
    setSubmited(true);
  };

  const handleEmailOnChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordOnChange = (e) => {
    setPassword(e.target.value);
  };

  const handleForgetPassword = () => {
    console.log("Forget Password");
  };

  const fetchData = async () => {
    setSubmited(false);
    const data = { email, password };
    const encryptedData = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      encryptKey
    ).toString();
    console.log(encryptedData);
    const parsingData = { user: encryptedData };
    // const decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptKey).toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData);

    const result = await axios.post(
      `http://localhost:5000/signin/`,
      parsingData
    );
    console.log(result.data);
  };

  useEffect(() => {
    if (submited) {
      fetchData();
    }
  }, [submited]);

  return (
    <>
      <Container>
        <FormWrap>
          <Icon to="/">Frog</Icon>
          <FormContent>
            <Form action="http://localhost:5000/auth/login" method="POST">
              <FormH1>본인 어카운트로 로그인 하시오</FormH1>
              <FormLabel htmlFor="for">이메일</FormLabel>
              <FormInput
                onChange={handleEmailOnChange}
                type="email"
                name="email"
                required
              />
              <FormLabel htmlFor="for">비밀번호</FormLabel>
              <FormInput
                onChange={handlePasswordOnChange}
                type="password"
                name="password"
                required
              />
              <FormButton onClick={handleSubmitOnclick} type="submit">
                계속
              </FormButton>
              <Text>
                비밀번호를 잊었나요? <br /> <br /> 혹은 <br />
              </Text>
              <Text> 어카운트가 없나요? </Text>
              <br />
              <FormButton2 type="submit">Frog 회원가입</FormButton2>
            </Form>
          </FormContent>
        </FormWrap>
      </Container>
    </>
  );
};

export default SignIn;
