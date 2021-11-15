import React from 'react'
import { Link } from 'react-router-dom'
import { Container, FormWrap, Icon, Form, Text, FormButton, FormButton2, FormContent, FormH1, FormInput, FormLabel } from './SigninElements'

const SignIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Frog</Icon>
                    <FormContent>
                        <Form action='#'>
                            <FormH1>본인 어카운트로 로그인 하시오</FormH1>
                            <FormLabel htmlFor='for'>이메일</FormLabel>
                            <FormInput type='email' required />
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

export default SignIn
