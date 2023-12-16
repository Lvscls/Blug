import styled from 'styled-components'

export const StyledHeader = styled.header`
  background-color: black;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 2px -2px white;
`;

export const ProfileLink = styled.a`
  text-decoration: none;
  color: white;
  border-radius: 50%;
  background-color: #555;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

export const Logout = styled.button`
  background-color: red;
  padding: 5px;
  border:none;
  cursor: pointer;
`

export const Login = styled.button`
  background-color: white;
  padding: 5px;
  border:none;
  cursor: pointer;
`