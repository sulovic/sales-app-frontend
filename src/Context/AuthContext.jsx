import React, { createContext, useState, useContext } from "react";
import { ApiLoginConnector, ApiLogoutConnector, ApiRefreshConnector } from "../components/ApiAuthConnectors";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = async ({ type, email, password, credential }) => {
    // User / password login
    if (type === "password") {
      try {
        const loginResponse = await ApiLoginConnector({
          data: { type, email, password },
        });
        const accessToken = loginResponse?.data?.accessToken;
        const decodedAccessToken = jwtDecode(accessToken);
        setAuthUser(decodedAccessToken);
        setAccessToken(accessToken);
        toast.success(`Uspešno ste se prijavili`, {
          position: "top-center",
        });
      } catch (err) {
        if (err?.response?.status === 401) {
          toast.warning("Niste autorizovani da posetite ovu stranu. Molimo Vas da se prijavite ponovo.", {
            position: "top-center",
          });
        } else {
          toast.warning(`Ups! Došlo je do greške: ${err}`, {
            position: "top-center",
          });
        }
      }

      // Google login
    } else if (type === "google") {
      try {
        const loginResponse = await ApiLoginConnector({
          data: { type, credential },
        });
        const accessToken = loginResponse?.data?.accessToken;
        const decodedAccessToken = jwtDecode(accessToken);
        setAuthUser(decodedAccessToken);
        setAccessToken(accessToken);
        toast.success(`Uspešno ste se prijavili`, {
          position: "top-center",
        });
      } catch (err) {
        toast.warning(`Ups! Došlo je do greške: ${err}`, {
          position: "top-center",
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await ApiLogoutConnector();
      setAuthUser(null);
      setAccessToken(null);
      toast.success(`Uspešno ste se odjavili`, {
        position: "top-center",
      });
    } catch (err) {
      toast.warning(`Ups! Došlo je do greške: ${err}`, {
        position: "top-center",
      });
    }
  };

  const handleRefreshToken = async () => { try {
    const refreshTokenResponse = await ApiRefreshConnector();
    if (refreshTokenResponse) {
      const newAccessToken = refreshTokenResponse?.data?.accessToken;
      const decodedAccessToken = jwtDecode(newAccessToken);
      setAuthUser(decodedAccessToken);
      setAccessToken(newAccessToken);
      return newAccessToken;
    }
  } catch (err) {
    toast.warning(`Ulogujte se kako biste pristupili aplikaciji`, {
      position: "top-center",
    });
  }};

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, accessToken, setAccessToken, handleLogin, handleLogout, handleRefreshToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
