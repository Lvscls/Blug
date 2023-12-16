import { backendURL } from '../../../constants/urls';

const generateQRCode = async ({username}) => {
  try {
    const response = await fetch(`${backendURL}/auth/generate-qrcode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de la récupération du QR code');
    }

    const data = await response.json();
    const imageUrl = data.imageUrl;

    console.log('Image URL:', imageUrl);
    return imageUrl; 
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
};

export default generateQRCode;
