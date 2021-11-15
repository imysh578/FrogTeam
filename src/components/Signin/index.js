import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, FormWrap, Icon, Form, Text, FormButton, FormContent, FormH1, FormInput, FormLabel } from './SigninElements'

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [submited, setSubmited] = useState(false)

    const handleSubmitOnclick = () =>{
        console.log('submit clicked');
        setSubmited(true);
    }

    const handleForgetPassword = () =>{
        console.log('Forget Password');
    }

    const handleEmailOnChange= (e) => {
        setEmail(e.target.value);
    }
    const handlePasswordOnChange= (e) => {
        setPassword(e.target.value);
    }

    const fetchData = async () => {
        setSubmited(false)
        const result = await axios.post(`http://localhost:5000/signin/${email}/${password}`)
        console.log(result);
    }
    
    useEffect(() => {
        if (submited){
            fetchData();
        }
    },[submited]);

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Frog</Icon>
                    <FormContent>
                        <Form action='#'>
                            <FormH1>본인 계정으로 로그인 하시오</FormH1>
                            <FormLabel htmlFor='for'>이메일</FormLabel>
                            <FormInput onChange={handleEmailOnChange} type='email' required />
                            <FormLabel htmlFor='for'>비밀번호</FormLabel>
                            <FormInput onChange={handlePasswordOnChange} type='password' required />
                            <FormButton onClick={handleSubmitOnclick} type='submit'>계속</FormButton>
                            <Text onClick={handleForgetPassword}>비밀번호를 잊었나요?</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn
