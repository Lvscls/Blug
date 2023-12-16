import styled from 'styled-components';

export const Form = styled.form`
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  width: 400px;
  color: black;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const Title = styled.h1`
  text-align:center;
  font-size: 20px;
`

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 3px;
  border: 1px solid #ccc;
  box-sizing: border-box;
`;

export const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-sizing: border-box;
  margin-bottom: 10px;


  &:hover {
    background-color: white;
    color: black;
    border-color: black;
  }
`;

export const GoogleButton = styled.div`
  width: 100%;
  height: 42px;
  background-color: #4285f4;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  position: relative;
  transition: box-shadow 0.3s ease;
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  margin-bottom: 10px;

  &:hover{
    background-color: #2464CD;
  }
`;

export const GoogleIconWrapper = styled.div`
  position: absolute;
  margin-top: 1px;
  margin-left: 1px;
  width: 40px;
  height: 40px;
  border-radius: 2px;
  background-color: white;
`;
export const GoogleIcon = styled.img`
  position: absolute;
  margin-top: 11px;
  margin-left: 11px;
  width: 18px;
  height: 18px;
`;

export const GoogleText = styled.div`
margin: 11px 11px 0 50px;
color: white;
font-size: 14px;
letter-spacing: 0.2px;
font-weight: 500;
`

export const GithubButton = styled.div`
  width: 100%;
  height: 42px;
  background-color: black;
  border-radius: 2px;
  box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
  position: relative;
  transition: box-shadow 0.3s ease;
  display: flex;
  align-items: flex-start;
  cursor: pointer;

  &:hover{
    background-color: grey;
  }
`;
