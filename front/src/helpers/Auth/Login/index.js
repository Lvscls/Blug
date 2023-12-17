import { backendURL } from '../../../constants/urls';

// fonction qui permet de connecté l'utilisateur
async function handleLogin({ username, password }) {
  try {
    const response = await fetch(`${backendURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { token, user } = data;

      return { success: true, user, token };
    } else {
      return { success: false, message: data.message || 'Échec de la connexion' };
    }
  } catch (error) {
    return { success: false, message: 'Erreur lors de la connexion' };
  }
}

export default handleLogin;
