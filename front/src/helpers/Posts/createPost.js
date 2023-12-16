import { backendURL } from '../../constants/urls';

async function createPost(postData) {
  try {
    const response = await fetch(`${backendURL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la création du post');
    }

    const createdPost = await response.json();
    return createdPost;
  } catch (error) {
    console.error('Erreur lors de la création du post:', error.message);
    return null;
  }
}

export default createPost
