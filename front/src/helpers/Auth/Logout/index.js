import { backendURL } from '../../../constants/urls';

async function handleLogout() {
  try {
    const response = await fetch(`${backendURL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    const data = await response.json();
 
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: data.message || 'Échec de la déconnexion' };
    }
  } catch (error) {
    return { success: false, message: 'Erreur lors de la déconnexion' };
  }
}

export default handleLogout;
