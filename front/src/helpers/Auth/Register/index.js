import { backendURL } from '../../../constants/urls';

async function handleRegister({ username, password }) {
  // Validation côté client
  if (!username || !password) {
    return { success: false, message: 'Veuillez fournir un nom d\'utilisateur et un mot de passe.' };
  }

  try {
    const response = await fetch(`${backendURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      const { user } = data;
      return { success: true, user };
    } else {
      return { success: false, message: data.message || 'Échec de l\'inscription' };
    }
  } catch (error) {
    return { success: false, message: 'Erreur lors de l\'inscription' };
  }
}

export default handleRegister;
