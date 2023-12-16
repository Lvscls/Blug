import { backendURL } from '../../../constants/urls';

async function handleGoogle() {
  try {
      window.location.href = `${backendURL}/auth/google`
    } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'authentification Google:', error);
  }
}

export default handleGoogle;
