import React from 'react'
import { Container, FormWrap, Icon, Form, Text, FormButton, FormContent, FormH1, FormInput, FormLabel } from './SigninElements'

const SignIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Frog</Icon>
                    <FormContent>
                        <Form action='#'>
                            <FormH1>본인 계정으로 로그인 하시오</FormH1>
                            <FormLabel htmlFor='for'>이메일</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>비밀번호</FormLabel>
                            <FormInput type='password' required />
                            <FormButton type='submit'>계속</FormButton>
                            <Text>비밀번호를 잊었나요?</Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignIn
