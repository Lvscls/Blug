import { backendURL } from '../../constants/urls';

// fonction qui permet de supprimer un post (non utilisé)
async function deletePost(postId) {
  try {
    const response = await fetch(`${backendURL}/posts/${postId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la suppression du post');
    }

    const deletionMessage = await response.json();
    return deletionMessage;
  } catch (error) {
    console.error('Erreur lors de la suppression du post:', error.message);
    return null;
  }
}
