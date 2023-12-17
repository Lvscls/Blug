import { backendURL } from '../../constants/urls';

// fonction qui permet de récupérer tous les posts d'un blog
async function getPosts(blogId) {
  try {
    const response = await fetch(`${backendURL}/posts/blogs/${blogId}/posts`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des posts');
    }

    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Erreur lors de la récupération des blogs:', error.message);
    return null;
  }
}


export default getPosts