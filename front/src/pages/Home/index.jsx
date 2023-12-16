import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import getBlogsPublic from "../../helpers/Blog/getBlogsPublic";


import {
  Container,
  BlogPost,
  Title,
  Description,
  Author,
  DivContent,
  Text,
  Button,
  Logout,
  Login,
} from "./styles";

const Home = () => {
  const [blogs, setBlogs] = React.useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    (async () => {
      const result = await getBlogsPublic();
      if (result) {
        setBlogs(result);
      } else {
        console.log("error");
      }
    })();
  }, []);

  return (
    <Container>
      <h2>Selection de blugs recommandés</h2>
      {blogs.map((blog) => (
        <BlogPost key={blog.id}>
          <DivContent>
            <Text>
              <Title>{blog.title}</Title>
              <Description>{blog.description}</Description>
              <Author>
                Par <b>{blog.autor}</b>
              </Author>
            </Text>
            <Button
              onClick={() => {
                navigate(`/${blog.id}/blog`);
              }}
            >
              Voir le blug
            </Button>
          </DivContent>
        </BlogPost>
      ))}
    </Container>
  );
};

export default Home;
