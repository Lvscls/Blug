import { backendURL } from "../../../constants/urls";

// fonction qui permet de gérer la déconnexion de tous les appareils
const handleLogoutAll = async (token) => {
  try {
    // Logout all devices
    const response = await fetch(`${backendURL}/auth/logout-all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true };
    } else {
      return {
        success: false,
        message: data.message || "Échec de la connexion",
      };
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};

export default handleLogoutAll;
