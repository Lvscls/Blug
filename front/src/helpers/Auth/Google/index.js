import { backendURL } from '../../../constants/urls';

// fonction qui permet de gérer l'authentification Google
async function handleGoogle() {
  try {
      window.location.href = `${backendURL}/auth/google`
    } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'authentification Google:', error);
  }
}

export default handleGoogle;
