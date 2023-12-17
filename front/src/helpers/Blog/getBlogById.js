import { backendURL } from '../../constants/urls';

// fonction qui permet de récupérer un blog par ID
async function getBlogById(blogId) {
  try {
    const response = await fetch(`${backendURL}/blogs/${blogId}`);

    if (!response.ok) {
      throw new Error('Blog non trouvé');
    }

    const blog = await response.json();
    return blog;
  } catch (error) {
    console.error('Erreur lors de la récupération du blog par ID:', error.message);
    return null;
  }
}

export default getBlogById