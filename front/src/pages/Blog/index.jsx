import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";

import { Container, BlogPost, Title, Content, Date } from "./styles";
import getBlogById from "../../helpers/Blog/getBlogById";
import getPosts from "../../helpers/Posts/getPosts";
import { useAuth } from "../../authContext";

const Blog = () => {
  const [blog, setBlog] = useState({});
  const [posts, setPosts] = useState([]);
  const { blogId } = useParams();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    ;(async () => {
      const blog = await getBlogById(blogId);
      setBlog(blog);
      const posts = await getPosts(blogId);
      console.log(posts)
      setPosts(posts);
    })()
    if(blog.isPrivate === true && !isAuthenticated){
      window.location.href = "/";
    }
  }, [blogId, blog.isPrivate]);

  return (
    <Container>
          <h1>Blog de {blog.autor}</h1>
          <h2>{blog.title}</h2>
          <p>{blog.description}</p>
      {posts.map((post) => (
        <>
          <BlogPost key={post.id}>
            <Title>{post.title}</Title>
            <img src={post.img} alt="post" width="300px" height="300px"/>
            <Content>{post.content}</Content>
            <Date>
              Publié le {post.date}
            </Date>
          </BlogPost>
        </>
      ))}
    </Container>
  );
};

export default Blog;
