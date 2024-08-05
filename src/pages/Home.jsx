import React from "react";
import { useAuth } from "../Context/AuthContext";

const Home = () => {

  const { authUser, handleLogin } = useAuth();
  return (
    <>
      <h3>Home, Hello</h3>
      <button className="mx-4 button button-red" onClick={() => handleLogin({ type: "password", email: "sulovic@gmail.com", password: "123456789" })}>Login</button>
    </>
  );
};

export default Home;
