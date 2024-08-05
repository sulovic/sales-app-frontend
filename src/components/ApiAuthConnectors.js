import axios from "axios";
import { toast } from "react-toastify";

const ApiLoginConnector = async ({ data }) => {
  const apiURL = `${import.meta.env.VITE_APP_API_BASE_URL}/login`;
  try {
    const response = await axios.post(apiURL, data, {
      withCredentials: true,
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const ApiLogoutConnector = async () => {
  const apiURL = `${import.meta.env.VITE_APP_API_BASE_URL}/logout`;

  try {
    const response = await axios.post(apiURL, null, {
      withCredentials: true,
      credentials: "include",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const ApiRefreshConnector = async () => {
  const apiURL = `${import.meta.env.VITE_APP_API_BASE_URL}/refresh`;

  try {
    const response = await axios.post(apiURL, null, {
      withCredentials: true,
      credentials: "include",
    });
    return response;
  } catch (error) {
    if (error.response.code === 401) {
      toast.warning(
        "Niste autorizovani da posetite ovu stranu. Molimo Vas da se prijavite ponovo.",
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 3000,
        }
      );
      setTimeout(() => {
        window.location.href = "/";
      }, 3500);
    } else {
      throw error;
    }
  }
};

export { ApiLoginConnector, ApiRefreshConnector, ApiLogoutConnector };
