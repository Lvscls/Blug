import { backendURL } from '../../constants/urls';

async function createBlog(blogData) {
  try {
    const response = await fetch(`${backendURL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(blogData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du blog');
    }

    const createdBlog = await response.json();
    return createdBlog;
  } catch (error) {
    console.error('Erreur lors de la création du blog:', error.message);
    return null;
  }
}

export default createBlog
