import { backendURL } from '../../constants/urls';

// fonction qui permet de changer la privacy d'un blog
async function changePrivacy(blogId) {
  try {
    const response = await fetch(`${backendURL}/blogs/change-privacy`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({blogId}),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message); 
    } else {
      const errorData = await response.json();
      console.error(errorData.message); 
    }
  } catch (error) {
    console.error("Erreur lors du changement de la privacy", error);
  }
}


export default changePrivacy