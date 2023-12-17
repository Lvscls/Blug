import { backendURL } from '../../../constants/urls';

// fonction qui permet de gérer l'authentification Github
async function handleGithub() {
  try {
      window.location.href = `${backendURL}/auth/github`
    } catch (error) {
    console.error('Erreur lors de l\'initialisation de l\'authentification Github:', error);
  }
}

export default handleGithub;
