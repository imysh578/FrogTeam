import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Container, FormWrap, Icon, Form, Text, FormButton, FormContent, FormH1, FormInput, FormLabel, FormButton2 } from './SigninElements'

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
                            <FormH1>본인 어카운트로 로그인 하시오</FormH1>
                            <FormLabel htmlFor='for'>이메일</FormLabel>
                            <FormInput onChange={handleEmailOnChange} type='email' required />
                            <FormLabel htmlFor='for'>비밀번호</FormLabel>
                            <FormInput type='password' required />
                            <FormButton type='submit'>계속</FormButton>
                            <Text>비밀번호를 잊었나요? <br/> <br/> 혹은 <br/></Text>
                            <Text>  어카운트가 없나요? </Text>
                            <br/>
                            <FormButton2 type='submit'>Frog 회원가입</FormButton2>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn;
