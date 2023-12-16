import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Title,
  GoogleButton,
  GoogleIcon,
  GoogleIconWrapper,
  GoogleText,
  GithubButton
} from "./styles";
import handleLogin from "../../helpers/Auth/Login";
import handleGoogle from "../../helpers/Auth/Google";
import handleGithub from "../../helpers/Auth/Github";
import { useAuth } from "../../authContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const { login, isAuthenticated } = useAuth(); 
  
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const loginData = await handleLogin({ username, password });

    if (loginData.success) {
      navigate('/');
      login(loginData.token, loginData.user)
    } else {
      console.error('Échec de la connexion:', loginData.message);
      setErrorMessage(loginData.message);
    }
  };

  const handleLoginGoogle = async (e) => {
    e.preventDefault();
    await handleGoogle();
  }

  const handleLoginGithub = async (e) => {
    e.preventDefault();
    await handleGithub();
  }

  return (
    <div>
      <Title>Connexion</Title>
      <Form >
        <FormGroup>
          <Label htmlFor="username">Pseudo</Label>
          <Input
            type="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Entrez votre pseudo"
            required
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Mot de passe</Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Entrez votre mot de passe"
            required
          />
        </FormGroup>
        <Button type="submit" onClick={handleFormSubmit}>Se connecter</Button>
        <a href="/register" style={{color: 'black', margin: 'auto'}}>Pas encore inscrit ?</a>
        {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
        <GoogleButton onClick={handleLoginGoogle}>
          <GoogleIconWrapper className="google-icon-wrapper">
            <GoogleIcon
              className="google-icon"
              src="https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"
            />
          </GoogleIconWrapper>
          <GoogleText className="btn-text">
            <b>Se connecter avec Google</b>
          </GoogleText>
        </GoogleButton>
        <GithubButton onClick={handleLoginGithub}>
          <GoogleIconWrapper>
            <GoogleIcon
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
          </GoogleIconWrapper>
          <GoogleText className="btn-text">
            <b>Se connecter avec Github</b>
          </GoogleText>
        </GithubButton>
      </Form>
    </div>
  );
};

export default Login;
