import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
`;

export const BlogPost = styled.div`
  background-color: #111;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0px 0px 10px 2px white;
`;

export const Title = styled.h2`
  margin-top: 0px;
  margin-bottom: 10px;
`;

export const Description = styled.p`
  margin-bottom: 10px;
`;

export const Author = styled.span`
  font-size: 12px;
`;


export const DivContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Text = styled.div`
`

export const Button = styled.button`
  border: none;
  background-color: transparent;
  color: white;
  font-size: 20px;
  cursor: pointer;
`

export const Logout = styled.button`
  background-color: red;
  padding: 5px;
  border:none;
  cursor: pointer;
`

export const Login = styled.button`
  background-color: with;
  padding: 5px;
  border:none;
  cursor: pointer;
`