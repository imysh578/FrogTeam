import React from 'react'
import { Link } from 'react-router-dom'
import { Container, FormWrap, Icon, Form, Text, FormButton, FormButton2, FormContent, FormH1, FormInput, FormLabel } from './SignupElements'

const SignUp = () => {
// const [usernameReg, setUsernameReg] = useState('')
// const [passwordReg, setPasswordReg] = useState('')

    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to="/">Frog</Icon>
                    <FormContent>
                        <Form action='http://localhost:5000/auth/join' method='POST'>
                            <FormH1>회원가입</FormH1>
                            <FormLabel htmlFor='for'>이메일</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>비밀번호</FormLabel>
                            <FormInput type='password' required />
                            <FormLabel htmlFor='for'>비밀번호 확인</FormLabel>
                            <FormInput type='password' required />
                            
                            
                            <FormButton2 type='submit'>Frog 회원가입 완료</FormButton2>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignUp
