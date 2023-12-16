import { backendURL } from '../../../constants/urls';

const handleVerifyCode = async (verificationCode, token) => {
  try {
    const response = await fetch(`${backendURL}/auth/verify-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        verificationCode,
        token,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la vérification du code');
    }
    const data = await response.json();
    console.log('Réponse du serveur:', data);
    return data;
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
};

export default handleVerifyCode;
