import styled from 'styled-components';
import UserFormInput from '../Inputs/';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FormContainer = styled.div`
padding: 10.26% 13.44% 10.26% 14.84%;
width: 50vw;
color: #E0E0E0;
@media screen and (max-height: 1000px) {
  padding-top: 5%;
}
@media screen and (max-height: 800px) {
  padding: 5% 14.84%;
}
`
const Form = styled.form`
  width: 100%;
  height: 100%;
  text-align: left;
  h2 {
    font-size: 1.875rem;
  }
`
const Welcome = styled.div`
width: 72.18%;
text-align: left;
margin-bottom: 34.615%;
  h1 {
    font-weight: 300;
    font-size: 3.75rem;
  }
`
const InputContainer = styled.div`
  position: relative;
  margin-top: 8.205%;
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`
const IconContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 30%;
`
const InputIcon = styled.img`
  height: 20px;
  width: 20px;
  transition: all 0.5s ease-out;
`
const ErrorDiv = styled.div`
  height: 24.487%;
  max-height: 24.487%;
  p {
    color: #E9B425;
    margin: 10% 18%;
    text-align: center;
    display: none;
  }
`
const RegisterP = styled.p`
  margin-top: 10px;
  text-align: center;
  max-width: 90.88%;
  a {
    color: #E9B425;
  }
`

const LoginForm = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const history = useNavigate();
  const userRegExp = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  const paswwordRegExp = new RegExp(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/);

  let userInput: HTMLInputElement | null;
  let pwInput: HTMLInputElement | null;
  let errorMsg: HTMLParagraphElement | null;

  function adjustIcons() {
    let userIcon: HTMLImageElement | null = document.querySelector('.userIcon');
    let pwIcon: HTMLImageElement | null = document.querySelector('.pwIcon');
    if (userIcon && pwIcon) {
      userIcon.style.marginRight = '3vw';
      pwIcon.style.marginRight = '3vw';
    }
  }

  function errorTest() {
    if (userRegExp.test(user) && paswwordRegExp.test(password)) {
      return true;
    } else {
      errorMessage();
      return false;
    }
  }

  function errorMessage() {
    userInput = document.querySelector('.userName');
    pwInput = document.querySelector('.userPw');
    errorMsg = document.querySelector('.errorMsg');
    if (userInput) {
      userInput.classList.add('error');
      userInput.style.borderColor = '#E9B425';
    }
    if (pwInput) {
      pwInput.classList.add('error')
      pwInput.style.borderColor = '#E9B425';
    }
    if (errorMsg) {
      errorMsg.style.display = 'flex';
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let test = errorTest();
    if (test) {
      try {
        let res = await fetch(`http://127.0.0.1:3000/users/login?user=${user}&password=${password}`, {
          method: "GET",
          headers: new Headers({ 'Content-Type': 'Application/Json' })
        });

        let loginStatus = res.status;
        if (loginStatus === 200) {
          history('/home');
        } else {
          errorMessage();
        }
      } catch (error) {
        alert(error);
      }
    }
  }
  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Welcome><h1>Olá,</h1><p>Para continuar navegando de forma segura, efetue o login na rede</p></Welcome>
        <h2>Login</h2>
        <InputContainer>
          <UserFormInput type='email' name='user' className='userName' placeholder='Usuário'
            onChange={(e) => { setUser(e.target.value); adjustIcons(); }} />
          <IconContainer>
            <InputIcon src='images/icon-user.svg' className='userIcon' />
          </IconContainer>
        </InputContainer>
        <InputContainer>
          <UserFormInput type='password' name='password' className='userPw' placeholder='Senha'
            onChange={(e) => { setPassword(e.target.value); adjustIcons() }} />
          <IconContainer>
            <InputIcon src='images/icon-password.svg' className='pwIcon' />
          </IconContainer>
        </InputContainer>
        <ErrorDiv>
          <p className='errorMsg'>Ops, usuário ou senha inválidos. Tente novamente!</p>
        </ErrorDiv>
        <UserFormInput type='submit' name='userSubmit' value='Continuar' />
        <RegisterP>Não tem conta? Cadastre-se <a href='/register'>aqui</a>.</RegisterP>
      </Form>
    </FormContainer>
  )
}
export default LoginForm;