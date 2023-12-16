import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Title,
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  GoogleButton,
  GoogleIcon,
  GoogleIconWrapper,
  GoogleText,
  GithubButton,
} from "./styles";
import handleRegister from "../../helpers/Auth/Register";
import handleGoogle from "../../helpers/Auth/Google";
import handleGithub from "../../helpers/Auth/Github";
import { useAuth } from "../../authContext";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth(); 

  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegisterApp = async (e) => {
    e.preventDefault();
    const registerData = await handleRegister({ username, password });

    if (registerData.success) {
      console.log("Inscription réussie!", registerData.user);
      navigate("/login");
    } else {
      console.error("Échec de l'inscription:", registerData.message);
    }
  };

  const handleRegisterGoogle = async (e) => {
    e.preventDefault();
    await handleGoogle();
  };

  const handleRegisterGithub = async (e) => {
    e.preventDefault();
    await handleGithub();
  }

  return (
    <div>
      <Title>Inscription</Title>
      <Form>
        <FormGroup>
          <Label htmlFor="username">Pseudo</Label>
          <Input
            type="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
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
            placeholder="Enter your password"
            required
          />
        </FormGroup>
        <Button type="submit" onClick={handleRegisterApp}>
          S'inscrire
        </Button>
        <GoogleButton onClick={handleRegisterGoogle}>
          <GoogleIconWrapper className="google-icon-wrapper">
            <GoogleIcon
              className="google-icon"
              src="https://assets.stickpng.com/images/5847f9cbcef1014c0b5e48c8.png"
            />
          </GoogleIconWrapper>
          <GoogleText className="btn-text">
            <b>S'inscrire avec Google</b>
          </GoogleText>
        </GoogleButton>
        <GithubButton onClick={handleRegisterGithub}>
          <GoogleIconWrapper className="twitch-icon-wrapper">
            <GoogleIcon
              className="github-icon"
              src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            />
          </GoogleIconWrapper>
          <GoogleText className="btn-text">
            <b>S'inscrire avec Github</b>
          </GoogleText>
        </GithubButton>
      </Form>
    </div>
  );
};

export default Register;
