import { backendURL } from '../../constants/urls';

async function modifyPost(postId, postData) {
    try {
        const response = await fetch(`${backendURL}/posts/${postId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify(postData),
        });
    
        if (!response.ok) {
          throw new Error('Erreur lors de la modification du post');
        }
    
        const createdPost = await response.json();
        return createdPost;
      } catch (error) {
        console.error('Erreur lors de la modification du post:', error.message);
        return null;
      }
}


export default modifyPost