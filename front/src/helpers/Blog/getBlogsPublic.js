import { backendURL } from '../../constants/urls';

// fonction qui permet de récupérer tous les blogs public
async function getBlogsPublic() {
  try {
    const response = await fetch(`${backendURL}/blogs/public/blogs`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des blogs public');
    }

    const blogs = await response.json();
    return blogs;
  } catch (error) {
    console.error('Erreur lors de la récupération des blogs public:', error.message);
    return null;
  }
}


export default getBlogsPublic