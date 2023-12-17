import { backendURL } from '../../constants/urls';

// fonction qui permet de récupérer le user courant
const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${backendURL}/users/current-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        token,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récuperation du user');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
};

export default getCurrentUser
