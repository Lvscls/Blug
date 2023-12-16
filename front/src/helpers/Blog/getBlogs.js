import { backendURL } from '../../constants/urls';

async function getBlogs() {
  try {
    const response = await fetch(`${backendURL}/blogs`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des blogs');
    }

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error('Erreur lors de la récupération des blogs:', error.message);
    return null;
  }
}


export default getBlogs